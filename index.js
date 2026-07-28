const HaxballJS = require('haxball.js').default;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

HaxballJS().then((HBInit) => {
    // =====================================
    // ESP League BR | Headless + Firebase Realtime Database
    // =====================================

    var room = HBInit({
        roomName: "🏟️ ESP League BR | Dinâmico",
        maxPlayers: 12,
        noPlayer: true,
        public: true,
        token: process.env.token
    });

    // =====================================
    // CARREGAMENTO SEGURO DO ESTÁDIO (haxmap.hbs)
    // =====================================
    try {
        var mapPath = path.join(__dirname, 'haxmap.hbs');
        var mapaContent = fs.readFileSync(mapPath, 'utf8');
        room.setCustomStadium(mapaContent);
        console.log("🏟️ Estádio carregado com sucesso de 'haxmap.hbs'!");
    } catch (err) {
        console.error("❌ Erro ao carregar o arquivo 'haxmap.hbs':", err.message);
        console.log("⚠️ A sala usará o estádio padrão do HaxBall para evitar quedas.");
    }

    var admins = ["Doggao", "~ 𝓚𝓪𝓱"];
    room.setScoreLimit(3);
    room.setTimeLimit(3);
    room.setTeamsLock(true);
    
    room.onRoomLink = function(link){
        console.log(link);
    };

    // =====================================
    // CONEXÃO COM FIREBASE
    // =====================================
    var FIREBASE_CONFIG = {
        databaseURL: "https://doggao-discord-default-rtdb.firebaseio.com/haxball"
    };

    var FIREBASE_SECRET = "CAohCMsAc7eiDPeqcvitGJxoTBHVAVPsazeEF5J4"; 
    var FIREBASE_URL = FIREBASE_CONFIG.databaseURL;

    var dbData = { players: {}, stats: { totalGoals: 0, totalAssists: 0, totalGames: 0 } };
    var loggedInPlayers = {};

    function cleanKey(key) {
        return key.replace(/[.$#\[\]\/]/g, "_");
    }

    function loadDB() {
        fetch(FIREBASE_URL + "/.json?auth=" + FIREBASE_SECRET) 
            .then(res => {
                if (!res.ok) throw new Error("Erro de Autenticação. Verifique seu Segredo.");
                return res.json();
            }) 
            .then(data => {
                if (data) {
                    dbData.players = data.players || {};
                    dbData.stats = data.stats || { totalGoals: 0, totalAssists: 0, totalGames: 0 };
                    console.log("🔥 [Firebase] Dados carregados com segurança!"); 
                }
            })
            .catch(err => console.error("❌ [Firebase Error] Erro ao carregar:", err));
    }

    function saveDB() {
        fetch(FIREBASE_URL + "/.json?auth=" + FIREBASE_SECRET, { 
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dbData)
        })
        .catch(err => console.error("❌ [Firebase Error] Erro ao salvar:", err));
    }

    function getProfile(name) {
        var key = cleanKey(name);
        return dbData.players[key] || null;
    }

    function createProfile(player) {
        var key = cleanKey(player.name);
        if (!dbData.players[key]) {
            dbData.players[key] = {
                name: player.name,
                password: "", 
                goals: 0, assists: 0, wins: 0, losses: 0, games: 0,
                joinDate: new Date().toISOString()
            };
            saveDB();
        }
        return dbData.players[key];
    }

    function addGoal(name) {
        var key = cleanKey(name);
        if (!dbData.players[key]) return;
        dbData.players[key].goals++;
        dbData.stats.totalGoals++;
        saveDB();
    }

    function addAssist(name) {
        var key = cleanKey(name);
        if (!dbData.players[key]) return;
        dbData.players[key].assists++;
        dbData.stats.totalAssists++;
        saveDB();
    }

    function addWin(name) {
        var key = cleanKey(name);
        if (!dbData.players[key]) return;
        dbData.players[key].wins++;
        dbData.players[key].games++;
        saveDB();
    }

    function addLoss(name) {
        var key = cleanKey(name);
        if (!dbData.players[key]) return;
        dbData.players[key].losses++;
        dbData.players[key].games++;
        saveDB();
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
    // SISTEMA DE TIMES DINÂMICO E CAPITÃES
    // =====================================
    var redCaptain = null;
    var blueCaptain = null;
    var gameEnding = false;
    var lastKick = null;
    var secondLastKick = null;

    function manageTeams() {
        if (gameEnding) return;

        var players = room.getPlayerList() || [];
        var totalPlayers = players.length;
        var isGameRunning = room.getScores() !== null;

        var red = players.filter(p => p.team === 1);
        var blue = players.filter(p => p.team === 2);
        var specs = players.filter(p => p.team === 0);

        // Se tiver MAIS que 6 jogadores -> Modo Capitães
        if (totalPlayers > 6) {
            // Capitães não funcionam se a partida já começou
            if (isGameRunning) return;

            if (redCaptain && !room.getPlayer(redCaptain.id)) redCaptain = null;
            if (blueCaptain && !room.getPlayer(blueCaptain.id)) blueCaptain = null;

            if (!redCaptain && specs.length > 0) {
                redCaptain = specs.shift();
                room.setPlayerTeam(redCaptain.id, 1);
                room.sendAnnouncement("👑 " + redCaptain.name + " é o capitão do Time Vermelho! Use !pick <jogador>.", null, 0xFF4444, "bold");
            }

            if (!blueCaptain && specs.length > 0) {
                blueCaptain = specs.shift();
                room.setPlayerTeam(blueCaptain.id, 2);
                room.sendAnnouncement("👑 " + blueCaptain.name + " é o capitão do Time Azul! Use !pick <jogador>.", null, 0x4444FF, "bold");
            }

            var currentRed = room.getPlayerList().filter(p => p.team === 1).length;
            var currentBlue = room.getPlayerList().filter(p => p.team === 2).length;
            if (currentRed === 3 && currentBlue === 3 && room.getScores() === null) {
                setTimeout(function() {
                    if (room.getScores() === null) {
                        room.startGame();
                    }
                }, 500);
            }

        } else {
            // Modo Autobalanceamento Dinâmico (<= 6 jogadores)
            // FUNCIONA MESMO COM A PARTIDA JÁ COMEÇADA!
            redCaptain = null;
            blueCaptain = null;

            // Define o tamanho máximo por time dinamicamente:
            // 2 jogadores -> 1v1 (max = 1)
            // 4 jogadores -> 2v2 (max = 2)
            // 6 jogadores -> 3v3 (max = 3)
            var maxTeamSize = Math.min(3, Math.max(1, Math.floor(totalPlayers / 2)));

            var allActivePlayers = [...red, ...blue, ...specs];
            
            var newRedCount = 0;
            var newBlueCount = 0;

            for (var i = 0; i < allActivePlayers.length; i++) {
                var p = allActivePlayers[i];
                if (newRedCount < maxTeamSize) {
                    if (p.team !== 1) room.setPlayerTeam(p.id, 1);
                    newRedCount++;
                } else if (newBlueCount < maxTeamSize) {
                    if (p.team !== 2) room.setPlayerTeam(p.id, 2);
                    newBlueCount++;
                } else {
                    if (p.team !== 0) room.setPlayerTeam(p.id, 0);
                }
            }

            // Iniciar jogo se houver time equilibrado e o jogo estiver parado
            var curRed = room.getPlayerList().filter(p => p.team === 1).length;
            var curBlue = room.getPlayerList().filter(p => p.team === 2).length;
            if (curRed > 0 && curRed === curBlue && room.getScores() === null) {
                setTimeout(function() {
                    if (room.getScores() === null) {
                        room.startGame();
                    }
                }, 500);
            }
        }
    }

    // =====================================
    // UNIFORMES
    // =====================================
    const uniforms = {
        "Brasil": [0x009C3B, 0xFFDF00, 0x009C3B],
        "Argentina": [0x75AADB, 0xFFFFFF, 0x75AADB],
        "Espanha": [0xAA151B, 0xF1BF00, 0xAA151B],
        "França": [0x0055A4, 0xFFFFFF, 0xEF4135],
        "Holanda": [0xAE1C28, 0xFFFFFF, 0x21468B],
        "Alemanha": [0x000000, 0xDD0000, 0xFFCC00],
        "Inglaterra": [0xFFFFFF, 0xCF081F, 0xFFFFFF],
        "Portugal": [0x006600, 0xCC0000, 0x006600],
        "Italia": [0x009246, 0xFFFFFF, 0xCE2B37],
        "Uruguai": [0x75AADB, 0xFFFFFF, 0x75AADB],
        "Corinthians": [0x000000, 0xFFFFFF, 0x000000],
        "Palmeiras": [0x006600, 0xFFFFFF, 0x006600],
        "São Paulo": [0xCC0000, 0xFFFFFF, 0xCC0000],
        "Santos": [0xFFFFFF, 0x000000, 0xFFFFFF],
        "Flamengo": [0xCC0000, 0x000000, 0xCC0000],
        "Vasco": [0x000000, 0xFFFFFF, 0xCC0000],
        "Fluminense": [0xCC0000, 0x006600, 0xCC0000],
        "Botafogo": [0x000000, 0xFFFFFF, 0x000000],
        "Internacional": [0xCC0000, 0xFFFFFF, 0xCC0000],
        "Grêmio": [0x0066CC, 0xFFFFFF, 0x0066CC],
        "Cruzeiro": [0x0066CC, 0xFFFFFF, 0x0066CC],
        "Atlético-MG": [0x000000, 0xFFFFFF, 0xCC0000],
        "Bahia": [0x0066CC, 0xCC0000, 0x0066CC],
        "Sport": [0xCC0000, 0x000000, 0xCC0000],
        "Coritiba": [0x006600, 0xFFFFFF, 0x006600],
        "Athletico-PR": [0xCC0000, 0x000000, 0xCC0000],
        "Barcelona": [0x004D98, 0xCC0000, 0x004D98],
        "Real Madrid": [0xFFFFFF, 0xFFFFFF, 0xFFFFFF],
        "Milan": [0xCC0000, 0x000000, 0xCC0000],
        "Manchester United": [0xCC0000, 0xFFFFFF, 0xCC0000],
        "Manchester City": [0x0066CC, 0xFFFFFF, 0x0066CC],
        "Liverpool": [0xCC0000, 0xFFFFFF, 0xCC0000],
        "Chelsea": [0x0066CC, 0xFFFFFF, 0x0066CC],
        "Arsenal": [0xCC0000, 0xFFFFFF, 0xCC0000],
        "Bayern Munique": [0xCC0000, 0x0066CC, 0xCC0000],
        "Paris Saint-Germain": [0x0066CC, 0xCC0000, 0x0066CC]
    };

    function setUniform(room, teamId, uniformName) {
        if (!uniforms[uniformName]) return false;
        room.setTeamColors(teamId, 0, 0xFFFFFF, uniforms[uniformName]);
        return true;
    }

    // =====================================
    // EVENTOS DO HAXBALL
    // =====================================
    room.onPlayerJoin = function(player) {
        if (!getProfile(player.name)) createProfile(player);

        loggedInPlayers[player.id] = false;

        room.sendAnnouncement("🔐 Bem-vindo à ESP League BR, " + player.name + "!\n⚠️ Faça login com: !login <senha>\n📌 Sem cadastro? Use !register e acesse https://dcd.gg/espunited", player.id, 0xFF0000, "bold");

        room.setPlayerTeam(player.id, 0);
        manageTeams(); 
    };

    room.onPlayerLeave = function(player) {
        delete loggedInPlayers[player.id];
        if (redCaptain && redCaptain.id === player.id) redCaptain = null;
        if (blueCaptain && blueCaptain.id === player.id) blueCaptain = null;
        manageTeams();
    };

    room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
        manageTeams();
    };

    room.onPlayerBallKick = function(player) {
        if (!lastKick || lastKick.id !== player.id) {
            secondLastKick = lastKick;
            lastKick = player;
        }
    };

    room.onTeamGoal = function(team) {
        if (lastKick && lastKick.team === team) {
            addGoal(lastKick.name);
            room.sendAnnouncement("⚽ GOL DE " + lastKick.name.toUpperCase() + "!", null, 0x00FF00, "bold");

            if (secondLastKick && secondLastKick.team === team && secondLastKick.id !== lastKick.id) {
                addAssist(secondLastKick.name);
                room.sendAnnouncement("🎯 Assistência de " + secondLastKick.name + "!", null, 0x00FF00);
            }
        } else {
            room.sendAnnouncement("⚠️ Gol contra registrado!", null, 0xFF6666, "bold");
        }
        lastKick = null;
        secondLastKick = null;
    };

    room.onTeamVictory = function(scores) {
        if (gameEnding) return;
        gameEnding = true;

        var winnerTeam = scores.red > scores.blue ? 1 : 2;
        var winnerName = winnerTeam === 1 ? "🔴 VERMELHO" : "🔵 AZUL";

        var redPlayers = room.getPlayerList().filter(p => p.team === 1);
        var bluePlayers = room.getPlayerList().filter(p => p.team === 2);

        (winnerTeam === 1 ? redPlayers : bluePlayers).forEach(p => addWin(p.name));
        (winnerTeam === 1 ? bluePlayers : redPlayers).forEach(p => addLoss(p.name));

        dbData.stats.totalGames++;
        saveDB();

        room.sendAnnouncement("🏆 FIM DE JOGO! O Time " + winnerName + " venceu!", null, 0xFFD700, "bold");

        setTimeout(function() {
            room.stopGame();
            gameEnding = false;
            redCaptain = null;
            blueCaptain = null;
            manageTeams();

            setTimeout(function() {
                var currentRed = room.getPlayerList().filter(p => p.team === 1).length;
                var currentBlue = room.getPlayerList().filter(p => p.team === 2).length;
                if (room.getScores() === null && currentRed > 0 && currentRed === currentBlue) {
                    room.startGame();
                }
            }, 1000);
        }, 3000);
    };

    // =====================================
    // SISTEMA DE COMANDOS DE CHAT
    // =====================================
    room.onPlayerChat = function(player, message) {
        var args = message.split(" ");
        var cmd = args[0].toLowerCase();

        if (cmd === "!login") {
            var senhaDigitada = args.slice(1).join(" ");
            
            loadDB();
            
            setTimeout(function() {
                var profile = getProfile(player.name);

                if (!profile || !profile.password || profile.password === "") {
                    room.sendAnnouncement("❌ Você ainda não se cadastrou no site do Discord! Acesse https://dcd.gg/espunited", player.id, 0xFF0000);
                    return false;
                }

                if (profile.password === senhaDigitada) {
                    loggedInPlayers[player.id] = true;
                    var rank = getRank(profile);
                    
                    if (admins.includes(player.name)) {
                        room.setPlayerAdmin(player.id, true);
                        room.sendAnnouncement("👑 Acesso de Administrador concedido com sucesso!", player.id, 0xFFD700, "bold");
                    }

                    room.sendAnnouncement("✅ Login efetuado com sucesso! Bem-vindo de volta, " + rank.emoji + " " + player.name + ".", player.id, 0x00FF00, "bold");
                } else {
                    room.sendAnnouncement("❌ Senha incorreta!", player.id, 0xFF0000);
                }
            }, 500);

            return false;
        }

        if (cmd === "!register" || cmd === "!registro") {
            room.sendAnnouncement("📌 Para se registrar e definir sua senha, acesse o site oficial: https://dcd.gg/espunited", player.id, 0x00BFFF, "bold");
            return false;
        }

        if (cmd === "!help") {
            room.sendAnnouncement(
                "📌 COMANDOS DISPONÍVEIS:\n" +
                "!login <senha> - Fazer login na sala\n" +
                "!register - Ver link de cadastro\n" +
                "!perfil - Ver suas estatísticas\n" +
                "!ranking - Top 5 jogadores\n" +
                "!fila - Ver fila de espera\n" +
                "!pick <jogador> - Escolher jogador (Apenas Capitães)\n" +
                "!uni nome - Mudar uniforme do time (Admin)\n" +
                "!unilist - Lista de uniformes",
                player.id, 0x00BFFF
            );
            return false;
        }

        if (cmd === "!pick" || cmd === "!escolher") {
            if (room.getScores() !== null) {
                room.sendAnnouncement("❌ Não é possível escolher jogadores enquanto a partida está rolando!", player.id, 0xFF0000);
                return false;
            }

            var isRedCap = redCaptain && player.id === redCaptain.id;
            var isBlueCap = blueCaptain && player.id === blueCaptain.id;

            if (!isRedCap && !isBlueCap) {
                room.sendAnnouncement("❌ Apenas os capitães oficiais podem escolher jogadores!", player.id, 0xFF0000);
                return false;
            }

            var targetName = args.slice(1).join(" ");
            if (!targetName) {
                room.sendAnnouncement("⚠️ Use: !pick <nome_do_jogador>", player.id, 0xFFA500);
                return false;
            }

            var targetPlayer = room.getPlayerList().find(p => p.name.toLowerCase().includes(targetName.toLowerCase()));
            if (!targetPlayer) {
                room.sendAnnouncement("❌ Jogador não encontrado na sala!", player.id, 0xFF0000);
                return false;
            }

            if (targetPlayer.team !== 0) {
                room.sendAnnouncement("❌ Este jogador já está em um time!", player.id, 0xFF0000);
                return false;
            }

            var teamToAssign = isRedCap ? 1 : 2;
            var currentTeamCount = room.getPlayerList().filter(p => p.team === teamToAssign).length;

            if (currentTeamCount >= 3) {
                room.sendAnnouncement("❌ Seu time já está cheio (máximo de 3 jogadores)!", player.id, 0xFF0000);
                return false;
            }

            room.setPlayerTeam(targetPlayer.id, teamToAssign);
            
            var teamNameStr = teamToAssign === 1 ? "🔴 Vermelho" : "🔵 Azul";
            room.sendAnnouncement("✅ " + targetPlayer.name + " foi escolhido para o Time " + teamNameStr + "!", null, 0x00FF00, "bold");
            
            manageTeams();
            return false;
        }

        if (cmd === "!perfil" || cmd === "!profile") {
            var targetName = args.length > 1 ? args.slice(1).join(" ") : player.name;
            var data = getProfile(targetName);

            if (!data) {
                room.sendAnnouncement("❌ Perfil de '" + targetName + "' não encontrado!", player.id, 0xFF0000);
                return false;
            }

            var rank = getRank(data);
            room.sendAnnouncement(
                "👤 PERFIL DE " + data.name + "\n" +
                rank.emoji + " Rank: " + rank.name + "\n" +
                "⚽ Gols: " + (data.goals || 0) + " | 🎯 Assistências: " + (data.assists || 0) + "\n" +
                "🏆 Vitórias: " + (data.wins || 0) + " | ❌ Derrotas: " + (data.losses || 0) + "\n" +
                "📊 Partidas: " + (data.games || 0),
                player.id, 0x00BFFF
            );
            return false;
        }

        if (cmd === "!ranking" || cmd === "!rank") {
            var allPlayers = Object.values(dbData.players);
            allPlayers.sort((a, b) => ((b.goals || 0) + (b.assists || 0)) - ((a.goals || 0) + (a.assists || 0)));

            var text = "🏆 TOP 5 JOGADORES:\n";
            allPlayers.slice(0, 5).forEach((p, idx) => {
                var r = getRank(p);
                text += (idx + 1) + ". " + r.emoji + " " + p.name + " - " + ((p.goals || 0) + (p.assists || 0)) + " pts\n";
            });
            room.sendAnnouncement(text, player.id, 0xFFD700);
            return false;
        }

        if (cmd === "!fila") {
            var specs = room.getPlayerList().filter(p => p.team === 0);
            var text = "📋 FILA DE ESPERA (" + specs.length + "):\n";
            specs.forEach((p, i) => text += (i + 1) + ". " + p.name + "\n");
            room.sendAnnouncement(text, player.id, 0xFFA500);
            return false;
        }

        if (cmd === "!uni" || cmd === "!uniforme") {
            if (!player.admin) {
                room.sendAnnouncement("❌ Apenas admins podem mudar uniformes!", player.id, 0xFF0000);
                return false;
            }
            if (player.team === 0) {
                room.sendAnnouncement("⚠️ Mude para um time antes de alterar a camisa!", player.id, 0xFFA500);
                return false;
            }
            var uniName = args.slice(1).join(" ");
            var key = Object.keys(uniforms).find(k => k.toLowerCase() === uniName.toLowerCase());

            if (key && setUniform(room, player.team, key)) {
                room.sendAnnouncement("👕 Uniforme alterado para " + key + "!", null, 0x00FF00);
            } else {
                room.sendAnnouncement("❌ Uniforme não encontrado. Use !unilist", player.id, 0xFF0000);
            }
            return false;
        }

        if (cmd === "!unilist") {
            room.sendAnnouncement("👕 UNIFORMES: " + Object.keys(uniforms).join(", "), player.id, 0x00BFFF);
            return false;
        }

        // Envio de mensagens públicas
        if (loggedInPlayers[player.id]) {
            var profile = getProfile(player.name) || createProfile(player);
            var rank = getRank(profile);
            room.sendAnnouncement("[" + rank.emoji + " " + player.name + "]: " + message, null, rank.color, "normal", 0);
        } else {
            room.sendAnnouncement("[Guest] " + player.name + ": " + message, null, 0x808080, "normal", 0);
        }
        
        return false;
    };

    // Inicialização
    loadDB();
    console.log("🚀 Servidor pronto!");
});