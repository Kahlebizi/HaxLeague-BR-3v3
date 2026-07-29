const HaxballJS = require('haxball.js').default;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

HaxballJS().then((HBInit) => {
    // =====================================
    // CONFIGURAÇÃO DA SALA
    // =====================================
    var room = HBInit({
        roomName: "🏆 ESP League BR | 3v3",
        maxPlayers: 12,
        noPlayer: true,
        public: true,
        token: process.env.token
    });

    try {
        var mapPath = path.join(__dirname, 'haxmap.hbs');
        var mapaContent = fs.readFileSync(mapPath, 'utf8');
        room.setCustomStadium(mapaContent);
        console.log("🏟️ Estádio carregado com sucesso!");
    } catch (err) {
        console.error("❌ Erro ao carregar o estádio:", err.message);
    }

    var admins = ["Doggao", "~ 𝓚𝓪𝓱"];
    room.setTeamsLock(true);
    room.setScoreLimit(3);
    room.setTimeLimit(3);

    room.onRoomLink = function(link){ console.log(link); };

    // =====================================
    // BANCO DE DADOS (FIREBASE)
    // =====================================
    var FIREBASE_URL = "https://doggao-discord-default-rtdb.firebaseio.com/haxball";
    var FIREBASE_SECRET = "CAohCMsAc7eiDPeqcvitGJxoTBHVAVPsazeEF5J4"; 

    var dbData = { players: {}, stats: { totalGoals: 0, totalAssists: 0, totalGames: 0 } };
    var loggedInPlayers = {};

    function cleanKey(key) { return key.replace(/[.$#\[\]\/]/g, "_"); }

    function loadDB() {
        fetch(FIREBASE_URL + "/.json?auth=" + FIREBASE_SECRET) 
            .then(res => res.json()) 
            .then(data => { if (data) { dbData.players = data.players || {}; dbData.stats = data.stats || { totalGoals: 0, totalAssists: 0, totalGames: 0 }; }})
            .catch(err => console.error("Erro BD:", err));
    }

    function saveDB() {
        fetch(FIREBASE_URL + "/.json?auth=" + FIREBASE_SECRET, { 
            method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dbData)
        }).catch(err => console.error("Erro BD:", err));
    }

    function getProfile(name) { return dbData.players[cleanKey(name)] || null; }

    function createProfile(player) {
        var key = cleanKey(player.name);
        if (!dbData.players[key]) {
            dbData.players[key] = { name: player.name, password: "", goals: 0, assists: 0, wins: 0, losses: 0, games: 0, joinDate: new Date().toISOString() };
            saveDB();
        }
        return dbData.players[key];
    }

    function updateStat(name, stat, value) {
        let key = cleanKey(name);
        if (dbData.players[key]) { dbData.players[key][stat] += value; saveDB(); }
    }

    function getRank(data) {
        if (!data) return { emoji: "🤖", name: "Iniciantes", color: 0x808080 };
        var total = (data.goals || 0) + (data.assists || 0);
        if (total < 150) return { emoji: "🤖", name: "Iniciantes", color: 0x808080 };
        if (total < 300) return { emoji: "🥉", name: "Bronze", color: 0xCD7F32 };
        if (total < 500) return { emoji: "🥈", name: "Prata", color: 0xC0C0C0 };
        if (total < 1000) return { emoji: "🥇", name: "Ouro", color: 0xFFD700 };
        return { emoji: "🌟", name: "Estrela", color: 0x00FFFF };
    }

    // =====================================
    // SISTEMA DE GERENCIAMENTO DE TIMES
    // =====================================
    let roomState = "WAITING"; // "WAITING", "PICKING"
    let redCaptain = null;
    let blueCaptain = null;
    let currentPickTurn = 0; // 1 = Red, 2 = Blue
    let lastPickTurnAnnounced = 0; // TRAVA CONTRA DUPLICAÇÃO DE MENSAGENS
    let pickTimeout = null;
    let isAutoMoving = false; // TRAVA DE SEGURANÇA CONTRA LOOPS
    let gameEnding = false;
    let lastKick = null, secondLastKick = null;

    function setTeamSafe(playerId, teamId) {
        isAutoMoving = true;
        room.setPlayerTeam(playerId, teamId);
        isAutoMoving = false;
    }

    function resetRoomState() {
        roomState = "WAITING";
        redCaptain = null;
        blueCaptain = null;
        currentPickTurn = 0;
        lastPickTurnAnnounced = 0;
        clearTimeout(pickTimeout);
        pickTimeout = null;
    }

    function manageTeams() {
        if (gameEnding) return;

        let players = room.getPlayerList();
        let total = players.length;

        // ----------------------------------------------------
        // 0. SALA VAZIA
        // ----------------------------------------------------
        if (total === 0) {
            resetRoomState();
            if (room.getScores() !== null) room.stopGame();
            return;
        }

        // ----------------------------------------------------
        // 1. MODO TREINO (APENAS 1 JOGADOR NA SALA)
        // ----------------------------------------------------
        if (total === 1) {
            resetRoomState();
            let p = players[0];
            if (p.team !== 1) setTeamSafe(p.id, 1);

            let scores = room.getScores();
            if (scores === null || scores.scoreLimit !== 0) {
                room.stopGame();
                room.setScoreLimit(0);
                room.setTimeLimit(0);
                room.startGame();
                room.sendAnnouncement("🎯 Modo Treino ativo! Aguardando novos jogadores...", p.id, 0x00FF00);
            }
            return;
        }

        // ----------------------------------------------------
        // 2. MODO 2+ JOGADORES
        // ----------------------------------------------------
        let scores = room.getScores();

        // Se o jogo rodando for MODO TREINO, encerra para iniciar o jogo oficial
        if (scores !== null && scores.scoreLimit === 0) {
            room.stopGame();
            scores = null;
        }

        // --- MID-GAME BALANCE (JOGO ROLANDO) ---
        if (scores !== null) {
            let red = players.filter(p => p.team === 1);
            let blue = players.filter(p => p.team === 2);
            let specs = players.filter(p => p.team === 0);
            let targetSize = total >= 6 ? 3 : (total >= 4 ? 2 : 1);

            if (red.length > blue.length) {
                if (specs.length > 0) {
                    let fill = specs.shift();
                    setTeamSafe(fill.id, 2);
                    room.sendAnnouncement(`🔄 ${fill.name} entrou no time Azul para completar a partida!`, null, 0x00FF00, "bold");
                } else {
                    let excess = red[red.length - 1];
                    setTeamSafe(excess.id, 0);
                    room.sendAnnouncement(`📉 Sem reservas! ${excess.name} foi movido para a fila para manter o jogo parelho!`, null, 0xFFA500, "bold");
                }
                return;
            }

            if (blue.length > red.length) {
                if (specs.length > 0) {
                    let fill = specs.shift();
                    setTeamSafe(fill.id, 1);
                    room.sendAnnouncement(`🔄 ${fill.name} entrou no time Vermelho para completar a partida!`, null, 0x00FF00, "bold");
                } else {
                    let excess = blue[blue.length - 1];
                    setTeamSafe(excess.id, 0);
                    room.sendAnnouncement(`📉 Sem reservas! ${excess.name} foi movido para a fila para manter o jogo parelho!`, null, 0xFFA500, "bold");
                }
                return;
            }

            if (red.length === blue.length && red.length < targetSize && specs.length >= 2) {
                let pRed = specs.shift();
                let pBlue = specs.shift();
                setTeamSafe(pRed.id, 1);
                setTeamSafe(pBlue.id, 2);
                room.sendAnnouncement(`🔄 ${pRed.name} (Vermelho) e ${pBlue.name} (Azul) entraram no jogo em andamento!`, null, 0x00FF00, "bold");
                return;
            }

            return;
        }

        // --- MONTAGEM DE TIMES (PARTIDA PARADA) ---
        room.setScoreLimit(3);
        room.setTimeLimit(3);

        let red = players.filter(p => p.team === 1);
        let blue = players.filter(p => p.team === 2);
        let specs = players.filter(p => p.team === 0);

        let targetSize = total >= 6 ? 3 : (total >= 4 ? 2 : 1);

        // MODO 1V1 (Preenchimento Direto)
        if (targetSize === 1) {
            resetRoomState();

            if (red.length === 0 && specs.length > 0) { let p = specs.shift(); setTeamSafe(p.id, 1); red.push(p); }
            if (blue.length === 0 && specs.length > 0) { let p = specs.shift(); setTeamSafe(p.id, 2); blue.push(p); }

            while (red.length > 1) { let p = red.pop(); setTeamSafe(p.id, 0); }
            while (blue.length > 1) { let p = blue.pop(); setTeamSafe(p.id, 0); }

            let finalRed = room.getPlayerList().filter(p => p.team === 1);
            let finalBlue = room.getPlayerList().filter(p => p.team === 2);

            if (finalRed.length === 1 && finalBlue.length === 1 && room.getScores() === null) {
                room.startGame();
            }
            return;
        }

        // MODO CAPITÃO (2V2 E 3V3)
        while (red.length > targetSize) { let p = red.pop(); setTeamSafe(p.id, 0); }
        while (blue.length > targetSize) { let p = blue.pop(); setTeamSafe(p.id, 0); }

        if (red.length === targetSize && blue.length === targetSize) {
            resetRoomState();
            if (room.getScores() === null) room.startGame();
            return;
        }

        let needAnnounceCaptains = false;
        if (roomState !== "PICKING") {
            roomState = "PICKING";
            needAnnounceCaptains = true;
        }

        if (red.length === 0 && specs.length > 0) { let cap = specs.shift(); setTeamSafe(cap.id, 1); red.push(cap); needAnnounceCaptains = true; }
        if (blue.length === 0 && specs.length > 0) { let cap = specs.shift(); setTeamSafe(cap.id, 2); blue.push(cap); needAnnounceCaptains = true; }

        redCaptain = red[0] || null;
        blueCaptain = blue[0] || null;

        if (!redCaptain || !blueCaptain) {
            resetRoomState();
            setTimeout(manageTeams, 100);
            return;
        }

        if (needAnnounceCaptains) {
            room.sendAnnouncement(`👑 Capitães definidos: 🔴 ${redCaptain.name} vs 🔵 ${blueCaptain.name}`, null, 0xFFD700, "bold");
        }

        checkPickTurn(targetSize);
    }

    function checkPickTurn(targetSize) {
        let players = room.getPlayerList();
        let red = players.filter(p => p.team === 1);
        let blue = players.filter(p => p.team === 2);

        if (red.length === targetSize && blue.length === targetSize) {
            room.sendAnnouncement("✅ Equipes formadas! Bom jogo!", null, 0x00FF00, "bold");
            resetRoomState();
            if (room.getScores() === null) room.startGame();
            return;
        }

        let nextTurn = 0;
        if (red.length <= blue.length && red.length < targetSize) {
            nextTurn = 1;
        } else if (blue.length < targetSize) {
            nextTurn = 2;
        }

        if (nextTurn !== 0) {
            currentPickTurn = nextTurn;
            
            // Só envia anúncio e reseta o timer se o turno mudou para evitar duplicados
            if (lastPickTurnAnnounced !== currentPickTurn) {
                lastPickTurnAnnounced = currentPickTurn;
                let capName = (currentPickTurn === 1 ? redCaptain : blueCaptain)?.name || "Capitão";
                let teamTag = currentPickTurn === 1 ? "🔴 [VERMELHO]" : "🔵 [AZUL]";
                let teamColor = currentPickTurn === 1 ? 0xFF4444 : 0x4444FF;

                room.sendAnnouncement(`⏳ ${teamTag} Sua vez, ${capName}! Use !pick <nome> ou !random (20s)`, null, teamColor, "bold");
                startPickTimer(currentPickTurn);
            }
        }
    }

    function startPickTimer(teamId) {
        clearTimeout(pickTimeout);
        pickTimeout = setTimeout(() => {
            let currentCap = (teamId === 1) ? redCaptain : blueCaptain;
            if (currentCap) {
                setTeamSafe(currentCap.id, 0); // Remove capitão inativo para os specs
                room.sendAnnouncement(`⏰ Tempo esgotado! ${currentCap.name} demorou e perdeu o posto de capitão. Definindo novo capitão...`, null, 0xFFA500, "bold");
            }

            if (teamId === 1) redCaptain = null;
            else blueCaptain = null;

            lastPickTurnAnnounced = 0; // Força anúncio da vez do novo capitão
            manageTeams();
        }, 20000); // 20 SEGUNDOS
    }

    // =====================================
    // EVENTOS DE JOGO
    // =====================================
    room.onPlayerJoin = function(player) {
        if (!getProfile(player.name)) createProfile(player);
        loggedInPlayers[player.id] = false;
        room.sendAnnouncement(`🔐 Bem-vindo, ${player.name}!\n⚠️ Faça login com: !login <senha>\n📌 Sem cadastro? Acesse https://dcd.gg/espunited`, player.id, 0x00BFFF, "bold");
        manageTeams(); 
    };

    room.onPlayerLeave = function(player) {
        delete loggedInPlayers[player.id];
        manageTeams();
    };

    room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
        if (isAutoMoving) return; 
        manageTeams(); 
    };

    room.onPlayerBallKick = function(player) {
        if (!lastKick || lastKick.id !== player.id) {
            secondLastKick = lastKick;
            lastKick = player;
        }
    };

    room.onTeamGoal = function(team) {
        if (room.getPlayerList().length === 1) {
            room.sendAnnouncement("⚽ [TREINO] Gol marcado!", null, 0x00FF00, "bold");
            setTimeout(() => {
                if (room.getPlayerList().length === 1) {
                    room.stopGame();
                    setTimeout(() => manageTeams(), 100);
                }
            }, 600);
            return;
        }

        if (lastKick && lastKick.team === team) {
            updateStat(lastKick.name, "goals", 1);
            dbData.stats.totalGoals++; saveDB();
            room.sendAnnouncement(`⚽ GOL DE ${lastKick.name.toUpperCase()}!`, null, 0x00FF00, "bold");

            if (secondLastKick && secondLastKick.team === team && secondLastKick.id !== lastKick.id) {
                updateStat(secondLastKick.name, "assists", 1);
                dbData.stats.totalAssists++; saveDB();
                room.sendAnnouncement(`🎯 Assistência de ${secondLastKick.name}!`, null, 0x00FF00);
            }
        } else {
            room.sendAnnouncement("⚠️ Gol contra registrado!", null, 0xFF6666, "bold");
        }
        lastKick = null; secondLastKick = null;
    };

    room.onTeamVictory = function(scores) {
        if (room.getPlayerList().length <= 1) return;
        if (gameEnding) return;
        gameEnding = true;

        let winnerTeam = scores.red > scores.blue ? 1 : (scores.blue > scores.red ? 2 : 0);
        
        if (winnerTeam !== 0) {
            let winnerName = winnerTeam === 1 ? "🔴 VERMELHO" : "🔵 AZUL";
            let redPlayers = room.getPlayerList().filter(p => p.team === 1);
            let bluePlayers = room.getPlayerList().filter(p => p.team === 2);

            (winnerTeam === 1 ? redPlayers : bluePlayers).forEach(p => updateStat(p.name, "wins", 1));
            (winnerTeam === 1 ? bluePlayers : redPlayers).forEach(p => updateStat(p.name, "losses", 1));

            dbData.stats.totalGames++; saveDB();
            room.sendAnnouncement(`🏆 O Time ${winnerName} venceu! Todos os jogadores vão para a fila.`, null, 0xFFD700, "bold");
        } else {
            room.sendAnnouncement("⌛ Empate! Todos vão para a fila.", null, 0xFFA500, "bold");
        }

        setTimeout(() => {
            room.stopGame();
            gameEnding = false;

            let players = room.getPlayerList();
            // MOVE TODOS OS JOGADORES (GANHADORES E PERDEDORES) PARA A FILA (SPEC)
            players.filter(p => p.team !== 0).forEach(p => setTeamSafe(p.id, 0));

            resetRoomState();
            manageTeams();
        }, 3000);
    };

    // =====================================
    // CHAT & COMANDOS
    // =====================================
    room.onPlayerChat = function(player, message) {
        let args = message.split(" ");
        let cmd = args[0].toLowerCase();

        if (cmd === "!pick") {
            if (roomState !== "PICKING") {
                room.sendAnnouncement("❌ Não estamos na fase de escolha!", player.id, 0xFF0000);
                return false;
            }
            if (player.team !== currentPickTurn) {
                room.sendAnnouncement("❌ Não é a sua vez de escolher!", player.id, 0xFF0000);
                return false;
            }

            let targetName = args.slice(1).join(" ").toLowerCase();
            let specs = room.getPlayerList().filter(p => p.team === 0);
            let targetPlayer = specs.find(p => p.name.toLowerCase().includes(targetName));

            if (!targetPlayer) {
                room.sendAnnouncement("❌ Jogador não encontrado na fila (spec).", player.id, 0xFF0000);
                return false;
            }

            setTeamSafe(targetPlayer.id, currentPickTurn);
            room.sendAnnouncement(`👉 ${player.name} escolheu ${targetPlayer.name}!`, null, 0x00FF00, "bold");
            
            lastPickTurnAnnounced = 0; // Libera o anúncio para o próximo turno
            manageTeams();
            return false;
        }

        if (cmd === "!random") {
            if (roomState === "PICKING" && player.team === currentPickTurn) {
                let specs = room.getPlayerList().filter(p => p.team === 0);
                if (specs.length > 0) {
                    let randomSpec = specs[Math.floor(Math.random() * specs.length)];
                    setTeamSafe(randomSpec.id, currentPickTurn);
                    room.sendAnnouncement(`🎲 ${player.name} sorteou: ${randomSpec.name}!`, null, 0x00FF00, "bold");
                    
                    lastPickTurnAnnounced = 0; // Libera o anúncio para o próximo turno
                    manageTeams();
                }
            }
            return false;
        }

        if (cmd === "!login") {
            var senhaDigitada = args.slice(1).join(" ");
            loadDB();
            setTimeout(function() {
                var profile = getProfile(player.name);
                if (!profile || !profile.password || profile.password === "") {
                    room.sendAnnouncement("❌ Você não tem cadastro: https://dcd.gg/espunited", player.id, 0xFF0000);
                    return false;
                }
                if (profile.password === senhaDigitada) {
                    loggedInPlayers[player.id] = true;
                    if (admins.includes(player.name)) room.setPlayerAdmin(player.id, true);
                    room.sendAnnouncement("✅ Login efetuado com sucesso!", player.id, 0x00FF00, "bold");
                } else {
                    room.sendAnnouncement("❌ Senha incorreta!", player.id, 0xFF0000);
                }
            }, 500);
            return false;
        }

        if (loggedInPlayers[player.id]) {
            let rank = getRank(getProfile(player.name));
            room.sendAnnouncement(`[${rank.emoji} ${player.name}]: ${message}`, null, rank.color, "normal", 0);
        } else {
            room.sendAnnouncement(`[Guest] ${player.name}: ${message}`, null, 0x808080, "normal", 0);
        }
        
        return false;
    };

    loadDB();
    console.log("🚀 Servidor '🏆 ESP League BR | 3v3' pronto!");
});