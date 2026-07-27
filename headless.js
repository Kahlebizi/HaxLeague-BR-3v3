// =====================================
// HaxLeague BR | 3v3
// Headless Build - Gerado automaticamente
// =====================================

// =====================================
// database.js
// =====================================

let database = {};

const DATABASE_KEY = "HaxLeagueBR_players";

function loadDatabase() {
    try {
        const saved = localStorage.getItem(DATABASE_KEY);
        if (saved) {
            database = JSON.parse(saved);
        } else {
            database = {
                players: {},
                stats: {
                    totalGoals: 0,
                    totalAssists: 0,
                    totalGames: 0
                }
            };
            saveDatabase();
        }
        return database;
    } catch (error) {
        console.error('Erro ao carregar database:', error);
        database = {
            players: {},
            stats: {
                totalGoals: 0,
                totalAssists: 0,
                totalGames: 0
            }
        };
        saveDatabase();
        return database;
    }
}

function saveDatabase() {
    try {
        localStorage.setItem(DATABASE_KEY, JSON.stringify(database));
        return true;
    } catch (error) {
        console.error('Erro ao salvar database:', error);
        return false;
    }
}

function initDatabase() {
    loadDatabase();
    console.log('📊 Banco de dados inicializado!');
    return database;
}

function createProfile(player) {
    loadDatabase();

    if (!database.players[player.name]) {
        database.players[player.name] = {
            name: player.name,
            goals: 0,
            assists: 0,
            wins: 0,
            losses: 0,
            games: 0,
            uniform: "Nenhum",
            joinDate: new Date().toISOString(),
            lastSeen: new Date().toISOString()
        };

        saveDatabase();
        console.log(`📝 Perfil criado para ${player.name}`);
        return true;
    }
    return false;
}

function getProfile(name) {
    loadDatabase();
    return database.players[name] || null;
}

function getAllPlayers() {
    loadDatabase();
    return Object.values(database.players);
}

function getGlobalRank(allPlayers) {
    return allPlayers.sort((a, b) => {
        let ptsA = (a.goals || 0) + (a.assists || 0);
        let ptsB = (b.goals || 0) + (b.assists || 0);
        return ptsB - ptsA;
    });
}

function addGoal(name) {
    loadDatabase();
    if (!database.players[name]) return false;
    database.players[name].goals = (database.players[name].goals || 0) + 1;
    database.stats.totalGoals = (database.stats.totalGoals || 0) + 1;
    saveDatabase();
    return true;
}

function addAssist(name) {
    loadDatabase();
    if (!database.players[name]) return false;
    database.players[name].assists = (database.players[name].assists || 0) + 1;
    database.stats.totalAssists = (database.stats.totalAssists || 0) + 1;
    saveDatabase();
    return true;
}

function addWin(name) {
    loadDatabase();
    if (!database.players[name]) return false;
    database.players[name].wins = (database.players[name].wins || 0) + 1;
    database.players[name].games = (database.players[name].games || 0) + 1;
    saveDatabase();
    return true;
}

function addLoss(name) {
    loadDatabase();
    if (!database.players[name]) return false;
    database.players[name].losses = (database.players[name].losses || 0) + 1;
    database.players[name].games = (database.players[name].games || 0) + 1;
    saveDatabase();
    return true;
}

function addGame(name) {
    loadDatabase();
    if (!database.players[name]) return false;
    database.players[name].games = (database.players[name].games || 0) + 1;
    saveDatabase();
    return true;
}

function setPlayerUniform(name, uniform) {
    loadDatabase();
    if (!database.players[name]) return false;
    database.players[name].uniform = uniform;
    saveDatabase();
    return true;
}

function setUniform(name, uniform) {
    return setPlayerUniform(name, uniform);
}

function resetDatabase() {
    localStorage.removeItem(DATABASE_KEY);
    database = {
        players: {},
        stats: {
            totalGoals: 0,
            totalAssists: 0,
            totalGames: 0
        }
    };
    saveDatabase();
    console.log('🔄 Banco de dados resetado!');
    return database;
}

function exportDatabase() {
    loadDatabase();
    return JSON.stringify(database, null, 2);
}

function importDatabase(data) {
    try {
        database = JSON.parse(data);
        saveDatabase();
        return true;
    } catch (error) {
        console.error('Erro ao importar database:', error);
        return false;
    }
}

function getStats() {
    loadDatabase();
    return database.stats;
}

function getPlayerCount() {
    loadDatabase();
    return Object.keys(database.players).length;
}

// =====================================
// ranks.js
// =====================================

function getRank(data) {
    if (!data) return { emoji: "🤖", name: "Iniciantes" };

    let participacoes = (data.goals || 0) + (data.assists || 0);

    if (participacoes < 150) {
        return { emoji: "🤖", name: "Iniciantes" };
    }
    if (participacoes < 300) {
        return { emoji: "🥉", name: "Bronze" };
    }
    if (participacoes < 500) {
        return { emoji: "🥈", name: "Prata" };
    }
    if (participacoes < 1000) {
        return { emoji: "🥇", name: "Ouro" };
    }

    return { emoji: "🌟", name: "Estrela" };
}

function getRankTag(data) {
    let rank = getRank(data);
    return "[" + rank.emoji + "]";
}

function getRankEmoji(data) {
    let rank = getRank(data);
    return rank.emoji;
}

function getRankName(data) {
    let rank = getRank(data);
    return rank.name;
}

function getParticipacoes(data) {
    if (!data) return 0;
    return (data.goals || 0) + (data.assists || 0);
}

function getNextRank(data) {
    if (!data) return null;

    let participacoes = (data.goals || 0) + (data.assists || 0);
    let currentRank = getRank(data);

    if (currentRank.name === "Estrela") {
        return null;
    }

    let nextRank = null;
    let needed = 0;

    if (participacoes < 150) {
        nextRank = { emoji: "🥉", name: "Bronze" };
        needed = 150 - participacoes;
    } else if (participacoes < 300) {
        nextRank = { emoji: "🥈", name: "Prata" };
        needed = 300 - participacoes;
    } else if (participacoes < 500) {
        nextRank = { emoji: "🥇", name: "Ouro" };
        needed = 500 - participacoes;
    } else if (participacoes < 1000) {
        nextRank = { emoji: "🌟", name: "Estrela" };
        needed = 1000 - participacoes;
    }

    return nextRank ? { rank: nextRank, needed: needed } : null;
}

function getProgressToNext(data) {
    if (!data) return 0;

    let participacoes = (data.goals || 0) + (data.assists || 0);
    let currentRank = getRank(data);

    if (currentRank.name === "Estrela") return 100;

    let currentMin = 0;
    let nextMin = 0;

    if (participacoes < 150) {
        currentMin = 0;
        nextMin = 150;
    } else if (participacoes < 300) {
        currentMin = 150;
        nextMin = 300;
    } else if (participacoes < 500) {
        currentMin = 300;
        nextMin = 500;
    } else if (participacoes < 1000) {
        currentMin = 500;
        nextMin = 1000;
    }

    let range = nextMin - currentMin;
    let progress = participacoes - currentMin;
    return Math.min((progress / range) * 100, 100);
}

function getGlobalRank(players) {
    let ranking = Object.values(players || {});

    ranking.sort(function(a, b) {
        let totalA = (a.goals || 0) + (a.assists || 0);
        let totalB = (b.goals || 0) + (b.assists || 0);
        return totalB - totalA;
    });

    return ranking;
}

function getRankPosition(players, name) {
    let ranking = getGlobalRank(players);
    let position = ranking.findIndex(p => p.name === name);
    return position !== -1 ? position + 1 : null;
}

function getRankStats(data) {
    let rank = getRank(data);
    let next = getNextRank(data);
    let progress = getProgressToNext(data);
    let participacoes = getParticipacoes(data);

    return {
        current: rank,
        next: next ? next.rank : null,
        needed: next ? next.needed : 0,
        progress: progress,
        participacoes: participacoes,
        goals: data ? data.goals || 0 : 0,
        assists: data ? data.assists || 0 : 0
    };
}


// =====================================
// teams.js
// =====================================

let queue = [];
let captain = null;
let picking = false;
let pickedPlayers = [];
let currentTeams = { red: [], blue: [] };
let matchStats = { redGoals: 0, blueGoals: 0 };
let matchInProgress = false;

function addToQueue(player) {
    if (!queue.includes(player.id)) {
        queue.push(player.id);
        return true;
    }
    return false;
}

function removeFromQueue(player) {
    queue = queue.filter(id => id != player.id);
}

function getQueue() {
    return queue;
}

function isInQueue(player) {
    return queue.includes(player.id);
}

function clearQueue() {
    queue = [];
}

function getCurrentTeams() {
    return currentTeams;
}

function getMatchStats() {
    return matchStats;
}

function getGameMode(room) {
    let players = room.getPlayerList().filter(p => p.team != 0);
    let total = players.length;

    if (total >= 6) {
        return { mode: "3x3", players: 3 };
    }
    if (total >= 4) {
        return { mode: "2x2", players: 2 };
    }
    if (total >= 2) {
        return { mode: "1x1", players: 1 };
    }

    return { mode: "Aguardando jogadores", players: 0 };
}

function balanceTeams(room) {
    let players = room.getPlayerList().filter(p => p.team != 0);
    let mode = getGameMode(room);

    if (mode.players == 0) {
        room.sendAnnouncement("⏳ Esperando jogadores...", null);
        return;
    }

    let shuffled = [...players].sort(() => Math.random() - 0.5);
    let red = [];
    let blue = [];

    shuffled.forEach(function(player, index) {
        if (index % 2 == 0) {
            red.push(player);
        } else {
            blue.push(player);
        }
    });

    currentTeams.red = red.map(p => p.id);
    currentTeams.blue = blue.map(p => p.id);

    red.forEach(function(player) {
        room.setPlayerTeam(player.id, 1);
    });

    blue.forEach(function(player) {
        room.setPlayerTeam(player.id, 2);
    });

    let redNames = red.map(p => p.name).join(', ');
    let blueNames = blue.map(p => p.name).join(', ');

    room.sendAnnouncement(
        "⚽ PARTIDA INICIADA: " + mode.mode + "\n\n" +
        "🔴 Vermelho: " + redNames + "\n" +
        "🔵 Azul: " + blueNames,
        null,
        0x00FF00,
        "bold"
    );

    matchInProgress = true;
    matchStats.redGoals = 0;
    matchStats.blueGoals = 0;
}

function autoBalance(room) {
    let players = room.getPlayerList();
    let available = players.filter(p => !currentTeams.red.includes(p.id) && !currentTeams.blue.includes(p.id));

    if (players.length < 2) {
        clearTeams(room);
        return;
    }

    if (players.length >= 7 && currentTeams.red.length > 0 && currentTeams.blue.length > 0) {
        handleSubstitution(room);
        return;
    }

}


function handleSubstitution(room) {
    let players = room.getPlayerList();

    let redActive = currentTeams.red.filter(id => players.some(p => p.id === id));
    let blueActive = currentTeams.blue.filter(id => players.some(p => p.id === id));

    let available = players.filter(p =>
        !currentTeams.red.includes(p.id) &&
        !currentTeams.blue.includes(p.id)
    );

    if (redActive.length >= 3 && blueActive.length >= 3) {
        available.forEach(p => {
            if (!queue.includes(p.id)) {
                queue.push(p.id);
            }
        });
        if (available.length > 0) {
            room.sendAnnouncement("📋 " + available.length + " jogador(es) na fila esperando!", null, 0xFFA500);
        }
        return;
    }

    if (available.length > 0 && queue.length > 0) {
        let firstInQueue = queue.shift();
        let player = players.find(p => p.id === firstInQueue);
        if (player) {
            if (redActive.length < 3) {
                currentTeams.red.push(player.id);
            } else if (blueActive.length < 3) {
                currentTeams.blue.push(player.id);
            }
            updateTeams(room);
            room.sendAnnouncement("🔄 " + player.name + " entrou no time!", null, 0x00FF00);
        }
    }
}

function updateTeams(room) {
    let players = room.getPlayerList();
    players.forEach(p => {
        room.setPlayerTeam(p.id, 0);
    });

    currentTeams.red.forEach(id => {
        room.setPlayerTeam(id, 1);
    });
    currentTeams.blue.forEach(id => {
        room.setPlayerTeam(id, 2);
    });
}

function clearTeams(room) {
    let players = room.getPlayerList();
    players.forEach(p => {
        room.setPlayerTeam(p.id, 0);
    });
    currentTeams.red = [];
    currentTeams.blue = [];
    matchInProgress = false;
}

function startPick(room, losingTeam) {
    if (queue.length == 0) {
        return false;
    }

    captain = queue.shift();
    picking = true;
    pickedPlayers = [];

    room.setPlayerTeam(captain, losingTeam);
    pickedPlayers.push(captain);

    let player = room.getPlayerList().find(p => p.id == captain);

    if (player) {
        room.sendAnnouncement("👑 " + player.name + " é o capitão do novo time!", null, 0xFFFF00, "bold");
        room.sendAnnouncement("🎯 Escolha 2 jogadores usando: !pick nome", captain);
    }

    return true;
}

function pickPlayer(room, captainId, name) {
    if (!picking || captainId != captain) {
        return false;
    }

    let target = room.getPlayerList().find(p => p.name.toLowerCase().includes(name.toLowerCase()));

    if (!target || target.id == captain || target.team != 0 || pickedPlayers.includes(target.id)) {
        return false;
    }

    room.setPlayerTeam(target.id, 2);
    pickedPlayers.push(target.id);

    room.sendAnnouncement("✅ " + target.name + " entrou no time!", null);

    if (pickedPlayers.length >= 3) {
        picking = false;
        captain = null;
        pickedPlayers = [];
        room.sendAnnouncement("🔥 Novo time formado!", null, 0x00FF00, "bold");
        matchInProgress = true;
    }

    return true;
}

function getCaptain() {
    return captain;
}

function isPicking() {
    return picking;
}

function getPickedPlayers() {
    return pickedPlayers;
}

function endMatch(room, database) {
    let players = room.getPlayerList();
    let winners = matchStats.redGoals > matchStats.blueGoals ? currentTeams.red : currentTeams.blue;
    let losers = matchStats.redGoals < matchStats.blueGoals ? currentTeams.red : currentTeams.blue;

    let winnerNames = winners.map(id => players.find(p => p.id === id)?.name).filter(Boolean);
    let loserNames = losers.map(id => players.find(p => p.id === id)?.name).filter(Boolean);

    if (winnerNames.length > 0 && database) {
        winnerNames.forEach(name => {
            database.addWin(name);
        });
        loserNames.forEach(name => {
            database.addLoss(name);
        });

        room.sendAnnouncement(
            "🏆 " + winnerNames.join(', ') + " venceram a partida!\n" +
            "🔴 " + matchStats.redGoals + " x " + matchStats.blueGoals + " 🔵",
            null,
            0xFFD700,
            "bold"
        );
    }

    matchStats.redGoals = 0;
    matchStats.blueGoals = 0;
    matchInProgress = false;
    clearTeams(room);

    setTimeout(() => autoBalance(room), 3000);
}

function forceBalance(room) {
    clearTeams(room);
    autoBalance(room);
}


function onGameTick(room) {
    // Verifica se a partida acabou pelo tempo ou outras condições
}

function onPlayerActivity(room, player) {
    // Atualiza atividade do jogador
}

function onPlayerJoin(room, player) {
    setTimeout(() => autoBalance(room), 1000);
}

function onPlayerLeave(room, player) {
    removeFromQueue(player);
    currentTeams.red = currentTeams.red.filter(id => id !== player.id);
    currentTeams.blue = currentTeams.blue.filter(id => id !== player.id);
    updateTeams(room);
    setTimeout(() => autoBalance(room), 1000);
}


// =====================================
// uniforms.js
// =====================================

uniforms = {
    // ===== SELEÇÕES =====
    "Brasil": {
        colors: [0x009C3B, 0xFFDF00, 0x009C3B],
        textColor: 0xFFFFFF
    },
    "Argentina": {
        colors: [0x75AADB, 0xFFFFFF, 0x75AADB],
        textColor: 0x000000
    },
    "Espanha": {
        colors: [0xAA151B, 0xF1BF00, 0xAA151B],
        textColor: 0xFFFFFF
    },
    "França": {
        colors: [0x0055A4, 0xFFFFFF, 0xEF4135],
        textColor: 0xFFFFFF
    },
    "Holanda": {
        colors: [0xAE1C28, 0xFFFFFF, 0x21468B],
        textColor: 0xFFFFFF
    },
    "Alemanha": {
        colors: [0x000000, 0xDD0000, 0xFFCC00],
        textColor: 0xFFFFFF
    },
    "Inglaterra": {
        colors: [0xFFFFFF, 0xCF081F, 0xFFFFFF],
        textColor: 0x000000
    },
    "Portugal": {
        colors: [0x006600, 0xCC0000, 0x006600],
        textColor: 0xFFFFFF
    },
    "Italia": {
        colors: [0x009246, 0xFFFFFF, 0xCE2B37],
        textColor: 0x000000
    },
    "Uruguai": {
        colors: [0x75AADB, 0xFFFFFF, 0x75AADB],
        textColor: 0x000000
    },

    // ===== BRASIL - CLUBES =====
    "Corinthians": {
        colors: [0x000000, 0xFFFFFF, 0x000000],
        textColor: 0xFFFFFF
    },
    "Palmeiras": {
        colors: [0x006600, 0xFFFFFF, 0x006600],
        textColor: 0xFFFFFF
    },
    "São Paulo": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0x000000
    },
    "Santos": {
        colors: [0xFFFFFF, 0x000000, 0xFFFFFF],
        textColor: 0x000000
    },
    "Flamengo": {
        colors: [0xCC0000, 0x000000, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Vasco": {
        colors: [0x000000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Fluminense": {
        colors: [0xCC0000, 0x006600, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Botafogo": {
        colors: [0x000000, 0xFFFFFF, 0x000000],
        textColor: 0xFFFFFF
    },
    "Internacional": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Grêmio": {
        colors: [0x0066CC, 0xFFFFFF, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Cruzeiro": {
        colors: [0x0066CC, 0xFFFFFF, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Atlético-MG": {
        colors: [0x000000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Bahia": {
        colors: [0x0066CC, 0xCC0000, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Sport": {
        colors: [0xCC0000, 0x000000, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Coritiba": {
        colors: [0x006600, 0xFFFFFF, 0x006600],
        textColor: 0xFFFFFF
    },
    "Athletico-PR": {
        colors: [0xCC0000, 0x000000, 0xCC0000],
        textColor: 0xFFFFFF
    },

    // ===== EUROPA - CLUBES =====
    "Barcelona": {
        colors: [0x004D98, 0xCC0000, 0x004D98],
        textColor: 0xFFFFFF
    },
    "Real Madrid": {
        colors: [0xFFFFFF, 0xFFFFFF, 0xFFFFFF],
        textColor: 0x000000
    },
    "Real Madrid (Visitante)": {
        colors: [0x000000, 0x000000, 0x000000],
        textColor: 0xFFFFFF
    },
    "Milan": {
        colors: [0xCC0000, 0x000000, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Internazionale": {
        colors: [0x0066CC, 0x000000, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Juventus": {
        colors: [0xFFFFFF, 0x000000, 0xFFFFFF],
        textColor: 0x000000
    },
    "Manchester United": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Manchester City": {
        colors: [0x0066CC, 0xFFFFFF, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Liverpool": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Chelsea": {
        colors: [0x0066CC, 0xFFFFFF, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Arsenal": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Bayern Munique": {
        colors: [0xCC0000, 0x0066CC, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Borussia Dortmund": {
        colors: [0x000000, 0xFFCC00, 0x000000],
        textColor: 0xFFFFFF
    },
    "Paris Saint-Germain": {
        colors: [0x0066CC, 0xCC0000, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Atletico Madrid": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Sevilla": {
        colors: [0xFFFFFF, 0xCC0000, 0xFFFFFF],
        textColor: 0x000000
    },
    "Benfica": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Porto": {
        colors: [0x0066CC, 0xFFFFFF, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Sporting": {
        colors: [0x006600, 0xCC0000, 0x006600],
        textColor: 0xFFFFFF
    },
    "Ajax": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "PSV Eindhoven": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Celtic": {
        colors: [0x006600, 0xFFFFFF, 0x006600],
        textColor: 0xFFFFFF
    },
    "Rangers": {
        colors: [0x0066CC, 0xFFFFFF, 0x0066CC],
        textColor: 0xFFFFFF
    },

    // ===== OUTROS =====
    "Boca Juniors": {
        colors: [0x0066CC, 0xFFCC00, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "River Plate": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Náutico": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Santa Cruz": {
        colors: [0x000000, 0xFFFFFF, 0x000000],
        textColor: 0xFFFFFF
    },
    "Londrina": {
        colors: [0x0066CC, 0xFFFFFF, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Ceará": {
        colors: [0x000000, 0xFFFFFF, 0x000000],
        textColor: 0xFFFFFF
    },
    "Fortaleza": {
        colors: [0x0066CC, 0xFFFFFF, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Goiás": {
        colors: [0x006600, 0xFFFFFF, 0x006600],
        textColor: 0xFFFFFF
    },
    "Vila Nova": {
        colors: [0xCC0000, 0xFFFFFF, 0xCC0000],
        textColor: 0xFFFFFF
    },
    "Remo": {
        colors: [0x0066CC, 0xFFFFFF, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Paysandu": {
        colors: [0x0066CC, 0xFFFFFF, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "América-MG": {
        colors: [0x006600, 0xFFFFFF, 0x006600],
        textColor: 0xFFFFFF
    },
    "Guarani": {
        colors: [0x000000, 0xFFFFFF, 0x000000],
        textColor: 0xFFFFFF
    },
    "Ponte Preta": {
        colors: [0x000000, 0xFFFFFF, 0x000000],
        textColor: 0xFFFFFF
    },
    "Juventude": {
        colors: [0x006600, 0xFFFFFF, 0x006600],
        textColor: 0xFFFFFF
    },
    "Criciúma": {
        colors: [0x000000, 0xFFFFFF, 0x000000],
        textColor: 0xFFFFFF
    },
    "Figueirense": {
        colors: [0x000000, 0xFFFFFF, 0x000000],
        textColor: 0xFFFFFF
    },
    "Avaí": {
        colors: [0x0066CC, 0xFFFFFF, 0x0066CC],
        textColor: 0xFFFFFF
    },
    "Chapecoense": {
        colors: [0x006600, 0xFFFFFF, 0x006600],
        textColor: 0xFFFFFF
    }
};

function getRandomUniform() {
    let list = Object.keys(uniforms);
    return list[Math.floor(Math.random() * list.length)];
}

function getUniformList() {
    return Object.keys(uniforms);
}

function getUniform(name) {
    return uniforms[name] || null;
}

function setUniform(room, player, uniformName) {
    if (!uniforms[uniformName]) {
        return false;
    }

    let kit = uniforms[uniformName];

    if (kit.colors && kit.colors.length > 0) {
        room.setPlayerDiscProperties(player.id, {
            color: kit.colors[0]
        });

        if (kit.colors.length > 1) {
            room.setPlayerDiscProperties(player.id, {
                color: kit.colors[0],
                color2: kit.colors[1],
                color3: kit.colors[2] || kit.colors[0]
            });
        }
    }

    return true;
}

function getUniformColor(uniformName) {
    let kit = uniforms[uniformName];
    return kit ? kit.colors[0] : null;
}

function getUniformTextColor(uniformName) {
    let kit = uniforms[uniformName];
    return kit ? kit.textColor : 0xFFFFFF;
}

function searchUniform(search) {
    let results = [];
    let searchLower = search.toLowerCase();

    for (let key of Object.keys(uniforms)) {
        if (key.toLowerCase().includes(searchLower)) {
            results.push(key);
        }
    }

    return results;
}


// =====================================
// bot.js
// =====================================

 touchHistory = [];
let lastBallSpeed = 0;
lastActivity = {};
afkWarning = {};

const GOAL_MESSAGES = [
    "🔥 {player} meteu um balaço!",
    "🚀 QUE GOLAÇO! {player} acertou um chute absurdo!",
    "⚡ {player} mandou uma pancada!",
    "🎯 Frieza total de {player}!",
    "💥 {player} não perdoou!",
    "🌟 {player} fez um golaço de placa!",
    "🎪 {player} driblou todo mundo e marcou!",
    "💫 {player} colocou no ângulo!"
];

const ASSIST_MESSAGES = [
    "🎯 Assistência de {assist} para {scorer}!",
    "👀 {assist} achou {scorer} livre!",
    "🎪 {assist} deu um passe genial!",
    "📲 {assist} entregou de bandeja!",
    "🧠 {assist} com visão de jogo!",
    "✨ Passe magistral de {assist}!"
];

function getBallSpeed(room) {
    try {
        let ball = room.getBallPosition();
        if (!ball) return 0;
        let speed = Math.sqrt(ball.x * ball.x + ball.y * ball.y);
        return (speed * 3.6).toFixed(2);
    } catch (e) {
        return 0;
    }
}

function getRandomMessage(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function onPlayerJoin(room, player) {
    lastActivity[player.id] = Date.now();
    
    if (!getProfile(player.name)) {
        createProfile(player);
    }
    
    let rank = getRank(getProfile(player.name));
    room.sendAnnouncement(
        "👋 Bem-vindo ao HaxLeague BR | 3v3, " + rank.emoji + " " + player.name + "!\n📌 Digite !help para ver os comandos",
        player.id,
        0x00BFFF,
        "bold"
    );
}

function onPlayerLeave(player) {
    delete lastActivity[player.id];
    delete afkWarning[player.id];
    touchHistory = touchHistory.filter(id => id != player.id);
}

function onPlayerActivity(player) {
    lastActivity[player.id] = Date.now();
    afkWarning[player.id] = false;
}

function onPlayerBallKick(room, player) {
    touchHistory.push(player.id);
    if (touchHistory.length > 5) {
        touchHistory.shift();
    }
    lastActivity[player.id] = Date.now();
    lastBallSpeed = getBallSpeed(room);
}

function onTeamGoal(room) {
    if (touchHistory.length == 0) return;

    let players = room.getPlayerList();
    let scorerId = touchHistory[touchHistory.length - 1];
    let scorer = players.find(p => p.id == scorerId);

    if (!scorer) return;

    addGoal(scorer.name);

    let message = getRandomMessage(GOAL_MESSAGES);
    message = message.replace("{player}", scorer.name);

    let assistId = touchHistory[touchHistory.length - 2];
    let assist = players.find(p => p.id == assistId);

    if (assist && assist.team == scorer.team && assist.id != scorer.id) {
        addAssist(assist.name);
        let assistMsg = getRandomMessage(ASSIST_MESSAGES);
        assistMsg = assistMsg.replace("{assist}", assist.name).replace("{scorer}", scorer.name);
        message += "\n" + assistMsg;
    }



    room.sendAnnouncement(message, null, 0xFFD700, "bold");

    touchHistory = [];
    lastBallSpeed = 0;
}




// =====================================
// commands.js
// =====================================

function setupCommands(room, database, teams, ranks, uniforms) {

    room.onPlayerChat = function(player, message) {

        let args = message.split(" ");
        let command = args[0].toLowerCase();

        if (command == "!help") {
            room.sendAnnouncement(
                "📌 COMANDOS HaxLeague BR:\n\n" +
                "!perfil - Ver seu perfil\n" +
                "!rank - Top 5 jogadores\n" +
                "!entrar - Entrar na fila\n" +
                "!sair - Sair da fila\n" +
                "!fila - Ver fila atual\n" +
                "!times - Ver times atuais\n" +
                "!gol nome - Registrar gol\n" +
                "!assist nome - Registrar assistência\n" +
                "!stats - Estatísticas da sala\n" +
                "!topgols - Maiores artilheiros\n" +
                "!topassists - Maiores assistentes\n" +
                "!uni pais - Mudar uniforme\n" +
                "!pick nome - Escolher jogador (capitão)",
                player.id,
                0x00BFFF
            );
            return false;
        }

        if (command == "!perfil" || command == "!profile") {
            let data = database.getProfile(player.name);

            if (!data) {
                database.createProfile(player);
                data = database.getProfile(player.name);
            }

            let rank = ranks.getRank(data);

            room.sendAnnouncement(
                "👤 PERFIL DE " + player.name + "\n\n" +
                rank.emoji + " Rank: " + rank.name + "\n" +
                "⚽ Gols: " + (data.goals || 0) + "\n" +
                "🎯 Assistências: " + (data.assists || 0) + "\n" +
                "🏆 Vitórias: " + (data.wins || 0) + "\n" +
                "❌ Derrotas: " + (data.losses || 0) + "\n" +
                "📊 Partidas: " + (data.games || 0),
                player.id,
                0x00BFFF
            );
            return false;
        }

        if (command == "!rank" || command == "!ranking") {
            let allPlayers = database.getAllPlayers();
            let ranking = database.getGlobalRank(allPlayers);

            let text = "🏆 TOP 5 JOGADORES:\n\n";

            ranking.slice(0, 5).forEach(function(data, index) {
                let rank = ranks.getRank(data);
                let pts = (data.goals || 0) + (data.assists || 0);
                text += (index + 1) + ". " + rank.emoji + " " + data.name + " - " + pts + " pts\n";
            });

            room.sendAnnouncement(text, player.id, 0xFFD700);
            return false;
        }

        if (command == "!topgols") {
            let allPlayers = database.getAllPlayers();
            let sorted = allPlayers.sort((a, b) => (b.goals || 0) - (a.goals || 0));
            let text = "⚽ TOP 5 ARTILHEIROS:\n\n";
            sorted.slice(0, 5).forEach(function(data, index) {
                text += (index + 1) + ". " + data.name + " - " + (data.goals || 0) + " gols\n";
            });
            room.sendAnnouncement(text, player.id, 0xFFD700);
            return false;
        }

        if (command == "!topassists") {
            let allPlayers = database.getAllPlayers();
            let sorted = allPlayers.sort((a, b) => (b.assists || 0) - (a.assists || 0));
            let text = "🎯 TOP 5 ASSISTENTES:\n\n";
            sorted.slice(0, 5).forEach(function(data, index) {
                text += (index + 1) + ". " + data.name + " - " + (data.assists || 0) + " assistências\n";
            });
            room.sendAnnouncement(text, player.id, 0xFFD700);
            return false;
        }

        if (command == "!stats") {
            let db = database.loadDatabase();
            room.sendAnnouncement(
                "📊 ESTATÍSTICAS DA SALA:\n\n" +
                "⚽ Total de Gols: " + (db.stats.totalGoals || 0) + "\n" +
                "🎯 Total de Assistências: " + (db.stats.totalAssists || 0) + "\n" +
                "🏆 Total de Partidas: " + (db.stats.totalGames || 0) + "\n" +
                "👥 Jogadores Cadastrados: " + Object.keys(db.players).length,
                player.id,
                0x00BFFF
            );
            return false;
        }

        if (command == "!entrar") {
            if (teams.addToQueue(player)) {
                room.sendAnnouncement("📋 " + player.name + " entrou na fila!", null, 0x00FF00);
                teams.autoBalance(room);
            } else {
                room.sendAnnouncement("❌ Você já está na fila.", player.id, 0xFF0000);
            }
            return false;
        }

        if (command == "!sair") {
            teams.removeFromQueue(player);
            room.sendAnnouncement("❌ " + player.name + " saiu da fila.", null, 0xFF0000);
            return false;
        }

        if (command == "!fila") {
            let queue = teams.getQueue();
            if (queue.length == 0) {
                room.sendAnnouncement("📋 A fila está vazia.", player.id, 0xFFA500);
                return false;
            }
            let players = room.getPlayerList();
            let text = "📋 FILA ATUAL:\n\n";
            queue.forEach(function(id, index) {
                let p = players.find(x => x.id == id);
                if (p) text += (index + 1) + ". " + p.name + "\n";
            });
            room.sendAnnouncement(text, player.id, 0xFFA500);
            return false;
        }

        if (command == "!times") {
            let players = room.getPlayerList();
            let teamsData = teams.getCurrentTeams();
            let redNames = teamsData.red.map(id => players.find(p => p.id === id)?.name || 'Desconhecido').join(', ');
            let blueNames = teamsData.blue.map(id => players.find(p => p.id === id)?.name || 'Desconhecido').join(', ');
            room.sendAnnouncement(
                "🔴 Vermelho: " + (redNames || 'Vazio') + "\n" +
                "🔵 Azul: " + (blueNames || 'Vazio'),
                player.id,
                0x00BFFF
            );
            return false;
        }

        if (command == "!pick") {
            let name = args.slice(1).join(" ");
            if (!name) {
                room.sendAnnouncement("🎯 Use: !pick nome", player.id, 0xFFA500);
                return false;
            }
            let result = teams.pickPlayer(room, player.id, name);
            if (!result) {
                room.sendAnnouncement("❌ Você não pode escolher esse jogador.", player.id, 0xFF0000);
            } else {
                room.sendAnnouncement("✅ Jogador escolhido com sucesso!", player.id, 0x00FF00);
            }
            return false;
        }

        if (command == "!uni" || command == "!uniforme") {
            let uniName = args.slice(1).join(" ");
            if (!uniName) {
                room.sendAnnouncement("👕 Use: !uni NomeDoPaís (Ex: Brasil)", player.id, 0xFFA500);
                return false;
            }
            let success = uniforms.setUniform(room, player, uniName);
            if (success) {
                room.sendAnnouncement("👕 Uniforme alterado com sucesso!", player.id, 0x00FF00);
            } else {
                room.sendAnnouncement("❌ Uniforme não encontrado. Países disponíveis: Brasil, Alemanha, Argentina, França, Inglaterra, Itália, Holanda, Espanha, Portugal", player.id, 0xFF0000);
            }
            return false;
        }

        if (command == "!gol") {
            let scorerName = args.slice(1).join(' ');
            if (!scorerName) {
                room.sendAnnouncement('⚽ Use: !gol nome_do_jogador', player.id, 0xFFA500);
                return false;
            }

            let players = room.getPlayerList();
            let scorer = players.find(p => p.name.toLowerCase() === scorerName.toLowerCase());
            if (!scorer) {
                room.sendAnnouncement('❌ Jogador não encontrado!', player.id, 0xFF0000);
                return false;
            }

            database.addGoal(scorer.name);

            let team = room.getPlayerTeam(scorer.id);
            if (team === 1) {
                teams.matchStats.redGoals++;
            } else if (team === 2) {
                teams.matchStats.blueGoals++;
            }

            room.sendAnnouncement('⚽ GOL DE ' + scorer.name.toUpperCase() + '!', null, 0x00FF00);

            if (teams.matchStats.redGoals >= 5 || teams.matchStats.blueGoals >= 5) {
                setTimeout(() => teams.endMatch(room, database), 1000);
            }
            return false;
        }

        if (command == "!assist") {
            let assistName = args.slice(1).join(' ');
            if (!assistName) {
                room.sendAnnouncement('🎯 Use: !assist nome_do_jogador', player.id, 0xFFA500);
                return false;
            }

            let players = room.getPlayerList();
            let assistant = players.find(p => p.name.toLowerCase() === assistName.toLowerCase());
            if (!assistant) {
                room.sendAnnouncement('❌ Jogador não encontrado!', player.id, 0xFF0000);
                return false;
            }

            database.addAssist(assistant.name);
            room.sendAnnouncement('🎯 Assistência registrada para ' + assistant.name + '!', null, 0x00FF00);
            return false;
        }

        if (command == "!resetdb" && player.admin) {
            database.resetDatabase();
            room.sendAnnouncement('🔄 Banco de dados resetado com sucesso!', null, 0xFF0000);
            return false;
        }

        if (command == "!formartimes" && player.admin) {
            teams.clearTeams(room);
            teams.autoBalance(room);
            room.sendAnnouncement('🔄 Times reformados!', null, 0x00FF00);
            return false;
        }

        if (command == "!admin" && player.admin) {
            let targetName = args.slice(1).join(' ');
            if (!targetName) {
                room.sendAnnouncement('👑 Use: !admin nome_do_jogador', player.id, 0xFFA500);
                return false;
            }
            let players = room.getPlayerList();
            let target = players.find(p => p.name.toLowerCase() === targetName.toLowerCase());
            if (target) {
                room.setPlayerAdmin(target.id, true);
                room.sendAnnouncement('👑 ' + target.name + ' agora é admin!', null, 0xFFD700);
            } else {
                room.sendAnnouncement('❌ Jogador não encontrado!', player.id, 0xFF0000);
            }
            return false;
        }

        if (command == "!kick" && player.admin) {
            let targetName = args.slice(1).join(' ');
            if (!targetName) {
                room.sendAnnouncement('🚫 Use: !kick nome_do_jogador', player.id, 0xFFA500);
                return false;
            }
            let players = room.getPlayerList();
            let target = players.find(p => p.name.toLowerCase() === targetName.toLowerCase());
            if (target) {
                room.kickPlayer(target.id, 'Expulso por admin', false);
                room.sendAnnouncement('🚫 ' + target.name + ' foi expulso!', null, 0xFF0000);
            } else {
                room.sendAnnouncement('❌ Jogador não encontrado!', player.id, 0xFF0000);
            }
            return false;
        }

        if (command == "!clear" && player.admin) {
            room.clearBans();
            room.sendAnnouncement('🧹 Todos os bans foram removidos!', null, 0x00FF00);
            return false;
        }
    };
}



// =====================================
// index.js
// =====================================

// =====================================
// HaxLeague BR | 3v3 - VERSÃO COMPLETA
// =====================================

var room = HBInit({
    roomName: "ESP League BR | 3v3",
    maxPlayers: 20,
    noPlayer: true,
    public: true
});

// =====================================
// ESTÁDIO PERSONALIZADO - FUTSAL
// =====================================

var mapa = {"name":"Futsal x3  by Bazinga from HaxMaps","width":620,"height":270,"spawnDistance":350,"bg":{"type":"hockey","width":550,"height":240,"kickOffRadius":80,"cornerRadius":0},"vertexes":[{"x":550,"y":240,"trait":"ballArea"},{"x":550,"y":-240,"trait":"ballArea"},{"x":0,"y":270,"trait":"kickOffBarrier"},{"x":0,"y":80,"bCoef":0.15,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":180},{"x":0,"y":-80,"bCoef":0.15,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":180},{"x":0,"y":-270,"trait":"kickOffBarrier"},{"x":-550,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-590,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,-80]},{"x":-590,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":-550,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[-700,80]},{"x":550,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,-80]},{"x":590,"y":-80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,-80]},{"x":590,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,80]},{"x":550,"y":80,"cMask":["red","blue","ball"],"trait":"goalNet","curve":0,"color":"F8F8F8","pos":[700,80]},{"x":-550,"y":80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[-700,80]},{"x":-550,"y":240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":-550,"y":-80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[-700,-80]},{"x":-550,"y":-240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":-550,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","pos":[700,80]},{"x":550,"y":240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":-240,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8"},{"x":550,"y":-80,"bCoef":1.15,"cMask":["ball"],"trait":"ballArea","color":"F8F8F8","pos":[700,-80]},{"x":550,"y":-240,"bCoef":0,"cMask":["ball"],"trait":"ballArea"},{"x":550,"y":-240,"bCoef":0,"cMask":["ball"],"trait":"ballArea"},{"x":-550,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0},{"x":550,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0},{"x":0,"y":-240,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":240,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"x":0,"y":-80,"bCoef":0.1,"cMask":["red","blue"],"trait":"kickOffBarrier","vis":true,"color":"F8F8F8"},{"x":0,"y":80,"bCoef":0.1,"cMask":["red","blue"],"trait":"kickOffBarrier","vis":true,"color":"F8F8F8"},{"x":0,"y":80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":-180},{"x":0,"y":-80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":-180},{"x":0,"y":80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":0},{"x":0,"y":-80,"trait":"kickOffBarrier","color":"F8F8F8","vis":true,"curve":0},{"x":-557.5,"y":80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false,"pos":[-700,80]},{"x":-557.5,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false},{"x":-557.5,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0},{"x":-557.5,"y":-80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0,"pos":[-700,-80]},{"x":557.5,"y":-240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0},{"x":557.5,"y":-80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","vis":false,"curve":0,"pos":[700,-80]},{"x":557.5,"y":80,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false,"pos":[700,80]},{"x":557.5,"y":240,"bCoef":1,"cMask":["ball"],"trait":"ballArea","curve":0,"vis":false},{"x":0,"y":-80,"bCoef":0.1,"trait":"line"},{"x":0,"y":80,"bCoef":0.1,"trait":"line"},{"x":-550,"y":-80,"bCoef":0.1,"trait":"line"},{"x":-550,"y":80,"bCoef":0.1,"trait":"line"},{"x":550,"y":-80,"bCoef":0.1,"trait":"line"},{"x":550,"y":80,"bCoef":0.1,"trait":"line"},{"x":-240,"y":256,"bCoef":0.1,"trait":"line"},{"x":-120,"y":256,"bCoef":0.1,"trait":"line"},{"x":-240,"y":-256,"bCoef":0.1,"trait":"line"},{"x":-120,"y":-224,"bCoef":0.1,"trait":"line"},{"x":-120,"y":-256,"bCoef":0.1,"trait":"line"},{"x":240,"y":256,"bCoef":0.1,"trait":"line"},{"x":120,"y":224,"bCoef":0.1,"trait":"line"},{"x":120,"y":256,"bCoef":0.1,"trait":"line"},{"x":240,"y":-224,"bCoef":0.1,"trait":"line"},{"x":240,"y":-256,"bCoef":0.1,"trait":"line"},{"x":120,"y":-224,"bCoef":0.1,"trait":"line"},{"x":120,"y":-256,"bCoef":0.1,"trait":"line"},{"x":-381,"y":240,"bCoef":0.1,"trait":"line"},{"x":-381,"y":256,"bCoef":0.1,"trait":"line"},{"x":-550,"y":200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":-390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-550,"y":226,"bCoef":0.1,"trait":"line","curve":-90},{"x":-536,"y":240,"bCoef":0.1,"trait":"line","curve":-90},{"x":-550,"y":-200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":-390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-550,"y":-226,"bCoef":0.1,"trait":"line","curve":90},{"x":-536,"y":-240,"bCoef":0.1,"trait":"line","curve":90},{"x":-556,"y":123,"bCoef":0.1,"trait":"line"},{"x":-575,"y":123,"bCoef":0.1,"trait":"line"},{"x":556,"y":123,"bCoef":0.1,"trait":"line"},{"x":575,"y":123,"bCoef":0.1,"trait":"line"},{"x":-556,"y":-123,"bCoef":0.1,"trait":"line"},{"x":-575,"y":-123,"bCoef":0.1,"trait":"line"},{"x":556,"y":-123,"bCoef":0.1,"trait":"line"},{"x":575,"y":-123,"bCoef":0.1,"trait":"line"},{"x":-381,"y":-240,"bCoef":0.1,"trait":"line"},{"x":-381,"y":-256,"bCoef":0.1,"trait":"line"},{"x":381,"y":240,"bCoef":0.1,"trait":"line"},{"x":381,"y":256,"bCoef":0.1,"trait":"line"},{"x":381,"y":-240,"bCoef":0.1,"trait":"line"},{"x":381,"y":-256,"bCoef":0.1,"trait":"line"},{"x":550,"y":-226,"bCoef":0.1,"trait":"line","curve":-90},{"x":536,"y":-240,"bCoef":0.1,"trait":"line","curve":-90},{"x":550,"y":226,"bCoef":0.1,"trait":"line","curve":90},{"x":536,"y":240,"bCoef":0.1,"trait":"line","curve":90},{"x":550,"y":200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":90},{"x":550,"y":-200,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":-90},{"x":390,"y":70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":390,"y":-70,"bCoef":0.1,"trait":"line","color":"F8F8F8","curve":0},{"x":-375,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-375,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":375,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":-277.5,"y":3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":1,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-1,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":3,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-3,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-2,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":2,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":-3.5,"bCoef":0.1,"trait":"line","curve":180},{"x":277.5,"y":3.5,"bCoef":0.1,"trait":"line","curve":180}],"segments":[{"v0":6,"v1":7,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,-80],"y":-80},{"v0":7,"v1":8,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":-590},{"v0":8,"v1":9,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[-700,80],"y":80},{"v0":10,"v1":11,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[700,-80],"y":-80},{"v0":11,"v1":12,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","x":590},{"v0":12,"v1":13,"curve":0,"color":"F8F8F8","cMask":["red","blue","ball"],"trait":"goalNet","pos":[700,80],"y":80},{"v0":2,"v1":3,"trait":"kickOffBarrier"},{"v0":3,"v1":4,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.15,"cGroup":["blueKO"],"trait":"kickOffBarrier"},{"v0":3,"v1":4,"curve":-180,"vis":true,"color":"F8F8F8","bCoef":0.15,"cGroup":["redKO"],"trait":"kickOffBarrier"},{"v0":4,"v1":5,"trait":"kickOffBarrier"},{"v0":14,"v1":15,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":-550},{"v0":16,"v1":17,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":-550},{"v0":18,"v1":19,"vis":true,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":240},{"v0":20,"v1":21,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":550},{"v0":22,"v1":23,"vis":true,"color":"F8F8F8","bCoef":1.15,"cMask":["ball"],"trait":"ballArea","x":550},{"v0":24,"v1":25,"vis":true,"color":"F8F8F8","bCoef":0,"cMask":["ball"],"trait":"ballArea","x":550,"y":-240},{"v0":26,"v1":27,"curve":0,"vis":true,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","y":-240},{"v0":28,"v1":29,"vis":true,"color":"F8F8F8","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":30,"v1":31,"vis":true,"color":"F8F8F8","bCoef":0.1,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"trait":"kickOffBarrier"},{"v0":38,"v1":39,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-557.5},{"v0":40,"v1":41,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":-557.5},{"v0":42,"v1":43,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":557.5},{"v0":44,"v1":45,"curve":0,"vis":false,"color":"F8F8F8","bCoef":1,"cMask":["ball"],"trait":"ballArea","x":557.5},{"v0":46,"v1":47,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":0},{"v0":48,"v1":49,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-550},{"v0":50,"v1":51,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":550},{"v0":64,"v1":65,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":66,"v1":67,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":69,"v1":68,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":70,"v1":71,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":67,"v1":71,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":73,"v1":72,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":74,"v1":75,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":76,"v1":77,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":123},{"v0":78,"v1":79,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":80,"v1":81,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-240,"y":-123},{"v0":82,"v1":83,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-381},{"v0":84,"v1":85,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"v0":86,"v1":87,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":381},{"v0":89,"v1":88,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":91,"v1":90,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":92,"v1":93,"curve":90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":94,"v1":95,"curve":-90,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line"},{"v0":96,"v1":97,"curve":0,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":390},{"v0":99,"v1":98,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":98,"v1":99,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":101,"v1":100,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":100,"v1":101,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":103,"v1":102,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":102,"v1":103,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":105,"v1":104,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":104,"v1":105,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-375},{"v0":107,"v1":106,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":106,"v1":107,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":109,"v1":108,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":108,"v1":109,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":111,"v1":110,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":110,"v1":111,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":113,"v1":112,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":112,"v1":113,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":375},{"v0":115,"v1":114,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":114,"v1":115,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":117,"v1":116,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":116,"v1":117,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":119,"v1":118,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":118,"v1":119,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":121,"v1":120,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":120,"v1":121,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":-277.5},{"v0":123,"v1":122,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":122,"v1":123,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":125,"v1":124,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":124,"v1":125,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":127,"v1":126,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":126,"v1":127,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":129,"v1":128,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5},{"v0":128,"v1":129,"curve":180,"vis":true,"color":"F8F8F8","bCoef":0.1,"trait":"line","x":277.5}],"goals":[{"p0":[-557.5,-80],"p1":[-557.5,80],"team":"red"},{"p0":[557.5,80],"p1":[557.5,-80],"team":"blue"}],"discs":[{"radius":5,"pos":[-550,80],"color":"FF6666","trait":"goalPost","y":80},{"radius":5,"pos":[-550,-80],"color":"FF6666","trait":"goalPost","y":-80,"x":-560},{"radius":5,"pos":[550,80],"color":"6666FF","trait":"goalPost","y":80},{"radius":5,"pos":[550,-80],"color":"6666FF","trait":"goalPost","y":-80},{"radius":3,"invMass":0,"pos":[-550,240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[-550,-240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[550,-240],"color":"FFCC00","bCoef":0.1,"trait":"line"},{"radius":3,"invMass":0,"pos":[550,240],"color":"FFCC00","bCoef":0.1,"trait":"line"}],"planes":[{"normal":[0,1],"dist":-240,"bCoef":1,"trait":"ballArea","vis":false,"curve":0},{"normal":[0,-1],"dist":-240,"bCoef":1,"trait":"ballArea"},{"normal":[0,1],"dist":-270,"bCoef":0.1},{"normal":[0,-1],"dist":-270,"bCoef":0.1},{"normal":[1,0],"dist":-620,"bCoef":0.1},{"normal":[-1,0],"dist":-620,"bCoef":0.1},{"normal":[1,0],"dist":-620,"bCoef":0.1,"trait":"ballArea","vis":false,"curve":0},{"normal":[-1,0],"dist":-620,"bCoef":0.1,"trait":"ballArea","vis":false,"curve":0}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"line":{"vis":true,"bCoef":0.1,"cMask":[""]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"playerPhysics":{"bCoef":0,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":5},"ballPhysics":{"radius":6.25,"bCoef":0.4,"invMass":1.5,"damping":0.99,"color":"FFCC00"}}

// =====================================
// APLICA CONFIGURAÇÕES
// =====================================

room.setCustomStadium(JSON.stringify(mapa));
room.setScoreLimit(5);
room.setTimeLimit(0);
room.setTeamsLock(true);

console.log('🏟️ HaxLeague BR | 3v3 iniciado!');

// =====================================
// KEEPALIVE
// =====================================

setInterval(function() {}, 15000);

// =====================================
// BANCO DE DADOS (localStorage)
// =====================================

var DB_KEY = "HaxLeagueBR_players";
var dbData = {};

function loadDB() {
    try {
        var saved = localStorage.getItem(DB_KEY);
        if (saved) {
            dbData = JSON.parse(saved);
        } else {
            dbData = {
                players: {},
                stats: { totalGoals: 0, totalAssists: 0, totalGames: 0 }
            };
            saveDB();
        }
    } catch (e) {
        dbData = {
            players: {},
            stats: { totalGoals: 0, totalAssists: 0, totalGames: 0 }
        };
        saveDB();
    }
    return dbData;
}

function saveDB() {
    try {
        localStorage.setItem(DB_KEY, JSON.stringify(dbData));
    } catch (e) {}
}

function getProfile(name) {
    loadDB();
    return dbData.players[name] || null;
}

function createProfile(player) {
    loadDB();
    if (!dbData.players[player.name]) {
        dbData.players[player.name] = {
            name: player.name,
            goals: 0,
            assists: 0,
            wins: 0,
            losses: 0,
            games: 0,
            joinDate: new Date().toISOString()
        };
        saveDB();
    }
    return dbData.players[player.name];
}

function addGoal(name) {
    loadDB();
    if (!dbData.players[name]) return;
    dbData.players[name].goals++;
    dbData.stats.totalGoals++;
    saveDB();
}

function addAssist(name) {
    loadDB();
    if (!dbData.players[name]) return;
    dbData.players[name].assists++;
    dbData.stats.totalAssists++;
    saveDB();
}

function addWin(name) {
    loadDB();
    if (!dbData.players[name]) return;
    dbData.players[name].wins++;
    dbData.players[name].games++;
    saveDB();
}

function addLoss(name) {
    loadDB();
    if (!dbData.players[name]) return;
    dbData.players[name].losses++;
    dbData.players[name].games++;
    saveDB();
}

function getAllPlayers() {
    loadDB();
    return Object.values(dbData.players);
}

// =====================================
// RANKS
// =====================================

function getRank(data) {
    if (!data) return { emoji: "🤖", name: "Iniciantes" };
    var total = (data.goals || 0) + (data.assists || 0);
    if (total < 150) return { emoji: "🤖", name: "Iniciantes" };
    if (total < 300) return { emoji: "🥉", name: "Bronze" };
    if (total < 500) return { emoji: "🥈", name: "Prata" };
    if (total < 1000) return { emoji: "🥇", name: "Ouro" };
    return { emoji: "🌟", name: "Estrela" };
}

// =====================================
// FILA E TIMES
// =====================================

var fila = [];
var times = { red: [], blue: [] };
var placar = { redGoals: 0, blueGoals: 0 };

function addToQueue(player) {
    if (fila.includes(player.id)) return false;
    fila.push(player.id);
    return true;
}

function removeFromQueue(player) {
    fila = fila.filter(function(id) { return id !== player.id; });
}

function getQueue() {
    return fila;
}

function getCurrentTeams() {
    return times;
}

function clearTeams() {
    var players = room.getPlayerList();
    players.forEach(function(p) { room.setPlayerTeam(p.id, 0); });
    times.red = [];
    times.blue = [];
}

function updateTeams() {
    var players = room.getPlayerList();
    players.forEach(function(p) { room.setPlayerTeam(p.id, 0); });
    times.red.forEach(function(id) { room.setPlayerTeam(id, 1); });
    times.blue.forEach(function(id) { room.setPlayerTeam(id, 2); });
}

function formRandomTeams() {
    var players = room.getPlayerList();

    // Pega apenas quem está na plateia (Spec / Time 0)
    var specs = players.filter(function(p) { return p.team === 0; });

    if (specs.length === 0) return;

    // Define o tamanho máximo de cada time
    var totalPlayers = players.length;
    var targetTeamSize = 1;
    if (totalPlayers >= 6) targetTeamSize = 3;
    else if (totalPlayers >= 4) targetTeamSize = 2;
    else if (totalPlayers >= 2) targetTeamSize = 1;

    // Garante que os arrays de times existam
    if (!times.red) times.red = [];
    if (!times.blue) times.blue = [];

    var currentRed = times.red.length;
    var currentBlue = times.blue.length;

    // Embaralha apenas os specs
    var shuffledSpecs = [...specs].sort(function() { return Math.random() - 0.5; });
    var extraPlayers = [];

    shuffledSpecs.forEach(function(p) {
        if (currentRed < targetTeamSize && currentRed <= currentBlue) {
            times.red.push(p.id);
            currentRed++;
            // Move APENAS o novo jogador via API para não resetar os outros
            room.setPlayerTeam(p.id, 1); 
        } else if (currentBlue < targetTeamSize) {
            times.blue.push(p.id);
            currentBlue++;
            // Move APENAS o novo jogador via API para não resetar os outros
            room.setPlayerTeam(p.id, 2); 
        } else {
            extraPlayers.push(p);
            if (!fila.includes(p.id)) fila.push(p.id);
        }
    });

    // Removemos a chamada de updateTeams() genérica para não resetar quem já tá jogando!

    // Busca os nomes atualizados para a mensagem
    var redNames = times.red.map(function(id) {
        var p = players.find(function(x) { return x.id === id; });
        return p ? p.name : '?';
    }).join(', ');

    var blueNames = times.blue.map(function(id) {
        var p = players.find(function(x) { return x.id === id; });
        return p ? p.name : '?';
    }).join(', ');

    // Anúncio idêntico ao original
    room.sendAnnouncement(
        "⚽ TIMES FORMADOS!\n\n" +
        "🔴 Vermelho: " + (redNames || 'Vazio') + "\n" +
        "🔵 Azul: " + (blueNames || 'Vazio') + "\n\n" +
        (extraPlayers.length > 0 ? "📋 " + extraPlayers.length + " jogador(es) na fila" : "Bom jogo!"),
        null, 0x00FF00
    );
}

function autoBalance() {
    var players = room.getPlayerList();
    if (players.length < 2) {
        clearTeams();
        return;
    }
    formRandomTeams();
}

function forceBalance() {
    clearTeams();
    autoBalance();
}

function endMatch() {
    var players = room.getPlayerList();
    var winners = placar.redGoals > placar.blueGoals ? times.red : times.blue;
    var losers = placar.redGoals < placar.blueGoals ? times.red : times.blue;

    var winnerNames = winners.map(function(id) {
        var p = players.find(function(x) { return x.id === id; });
        return p ? p.name : null;
    }).filter(Boolean);
    var loserNames = losers.map(function(id) {
        var p = players.find(function(x) { return x.id === id; });
        return p ? p.name : null;
    }).filter(Boolean);

    if (winnerNames.length > 0) {
        winnerNames.forEach(function(name) { addWin(name); });
        loserNames.forEach(function(name) { addLoss(name); });
        room.sendAnnouncement("🏆 " + winnerNames.join(', ') + " venceram!", null, 0xFFD700);
    }

    placar.redGoals = 0;
    placar.blueGoals = 0;
    clearTeams();
    setTimeout(function() { autoBalance(); }, 3000);
}

// =====================================
// AFK
// =====================================

var lastActivity = {};
var afkWarning = {};

function startAFK() {
    setInterval(function() {
        var players = room.getPlayerList();
        if (!players) return;
        players.forEach(function(player) {
            if (player.team == 0) return;
            var inactive = Date.now() - (lastActivity[player.id] || Date.now());
            if (inactive >= 10000 && !afkWarning[player.id]) {
                afkWarning[player.id] = true;
                room.sendAnnouncement("⚠️ " + player.name + ", você está parado! Se não se mexer em 10s será kickado.", player.id, 0xFFAA00);
            }
            if (inactive >= 20000 && afkWarning[player.id]) {
                room.kickPlayer(player.id, "AFK", false);
                delete lastActivity[player.id];
                delete afkWarning[player.id];
            }
        });
    }, 1000);
}

// =====================================
// GOLS
// =====================================

var touchHistory = [];


// =====================================
// ADMIN
// =====================================

function updateAdmins() {
    var players = room.getPlayerList();
    if (!players || players.length == 0) return;
    if (players.find(function(p) { return p.admin; })) return;
    room.setPlayerAdmin(players[0].id, true);
}

// =====================================
// UNIFORMES
// =====================================

uniforms = {
    "Brasil": { colors: [0x009C3B, 0xFFDF00, 0x009C3B] },
    "Alemanha": { colors: [0x000000, 0xDD0000, 0xFFCC00] },
    "Argentina": { colors: [0x75AADB, 0xFFFFFF, 0x75AADB] },
    "Espanha": { colors: [0xAA151B, 0xF1BF00, 0xAA151B] },
    "Franca": { colors: [0x0055A4, 0xFFFFFF, 0xEF4135] },
    "Inglaterra": { colors: [0xFFFFFF, 0xCF081F, 0xFFFFFF] },
    "Italia": { colors: [0x009246, 0xFFFFFF, 0xCE2B37] },
    "Holanda": { colors: [0xAE1C28, 0xFFFFFF, 0x21468B] },
    "Portugal": { colors: [0x006600, 0xCC0000, 0x006600] },
    "Corinthians": { colors: [0x000000, 0xFFFFFF, 0x000000] },
    "Palmeiras": { colors: [0x006600, 0xFFFFFF, 0x006600] },
    "Flamengo": { colors: [0xCC0000, 0x000000, 0xCC0000] },
    "Santos": { colors: [0xFFFFFF, 0x000000, 0xFFFFFF] },
    "SaoPaulo": { colors: [0xCC0000, 0xFFFFFF, 0xCC0000] },
    "Vasco": { colors: [0x000000, 0xFFFFFF, 0xCC0000] },
    "Fluminense": { colors: [0xCC0000, 0x006600, 0xCC0000] },
    "Botafogo": { colors: [0x000000, 0xFFFFFF, 0x000000] },
    "Internacional": { colors: [0xCC0000, 0xFFFFFF, 0xCC0000] },
    "Gremio": { colors: [0x0066CC, 0xFFFFFF, 0x0066CC] },
    "Cruzeiro": { colors: [0x0066CC, 0xFFFFFF, 0x0066CC] },
    "Barcelona": { colors: [0x004D98, 0xCC0000, 0x004D98] },
    "RealMadrid": { colors: [0xFFFFFF, 0xFFFFFF, 0xFFFFFF] },
    "Milan": { colors: [0xCC0000, 0x000000, 0xCC0000] },
    "InterMilan": { colors: [0x0066CC, 0x000000, 0x0066CC] },
    "Juventus": { colors: [0xFFFFFF, 0x000000, 0xFFFFFF] },
    "ManchesterUnited": { colors: [0xCC0000, 0xFFFFFF, 0xCC0000] },
    "Liverpool": { colors: [0xCC0000, 0xFFFFFF, 0xCC0000] },
    "Chelsea": { colors: [0x0066CC, 0xFFFFFF, 0x0066CC] },
    "Arsenal": { colors: [0xCC0000, 0xFFFFFF, 0xCC0000] },
    "Bayern": { colors: [0xCC0000, 0x0066CC, 0xCC0000] },
    "PSG": { colors: [0x0066CC, 0xCC0000, 0x0066CC] }
};

function setUniform(room, player, uniformName) {
    if (!uniforms[uniformName]) return false;
    var kit = uniforms[uniformName];
    if (kit.colors && kit.colors.length > 0) {
        room.setPlayerDiscProperties(player.id, {
            color: kit.colors[0],
            color2: kit.colors[1] || kit.colors[0],
            color3: kit.colors[2] || kit.colors[0]
        });
        return true;
    }
    return false;
}

// =====================================
// EVENTOS
// =====================================

room.onPlayerJoin = function(player) {
    console.log("✅ " + player.name + " entrou");
    updateAdmins();
    if (!getProfile(player.name)) createProfile(player);
    lastActivity[player.id] = Date.now();
    var rank = getRank(getProfile(player.name));
    room.sendAnnouncement(
        "👋 Bem-vindo á ESP League BR | 3v3, " + rank.emoji + " " + player.name + "!\n📌 Digite !help para ver os comandos",
        player.id,
        0x00BFFF,
        "bold"
    );
    room.sendAnnouncement("🤖 Use o comando !login para se registar e salvar seus dados.",
        player.id,
        0x00BFFF,
        "bold")
    setTimeout(function() { autoBalance(); }, 1000);
};

room.onPlayerLeave = function(player) {
    console.log("❌ " + player.name + " saiu");
    removeFromQueue(player);
    times.red = times.red.filter(function(id) { return id !== player.id; });
    times.blue = times.blue.filter(function(id) { return id !== player.id; });
    updateTeams();
    updateAdmins();
    setTimeout(function() { autoBalance(); }, 1000);
};

room.onPlayerBallKick = function(player) {
    touchHistory.push(player.id);
    if (touchHistory.length > 5) touchHistory.shift();
    lastActivity[player.id] = Date.now();
};

room.onPlayerActivity = function(player) {
    lastActivity[player.id] = Date.now();
    afkWarning[player.id] = false;
};

room.onTeamGoal = function(team) {
    onTeamGoal(room, team);
};

// =====================================
// COMANDOS
// =====================================

room.onPlayerChat = function(player, message) {
    var args = message.split(" ");
    var cmd = args[0].toLowerCase();

    if (cmd == "!help") {
        room.sendAnnouncement(
            "📌 COMANDOS:\n" +
            "!perfil - Ver seu perfil\n" +
            "!rank - Top 5 jogadores\n" +
            "!entrar - Entrar na fila\n" +
            "!sair - Sair da fila\n" +
            "!fila - Ver fila atual\n" +
            "!times - Ver times atuais\n" +
            "!gol nome - Registrar gol\n" +
            "!assist nome - Registrar assistência\n" +
            "!stats - Estatísticas da sala\n" +
            "!topgols - Maiores artilheiros\n" +
            "!topassists - Maiores assistentes\n" +
            "!uni nome - Mudar uniforme\n" +
            "!unilist - Ver uniformes disponíveis",
            player.id, 0x00BFFF
        );
        return false;
    }

    if (cmd == "!perfil" || cmd == "!profile") {
        var data = getProfile(player.name);
        if (!data) data = createProfile(player);
        var rank = getRank(data);
        room.sendAnnouncement(
            "👤 PERFIL DE " + player.name + "\n\n" +
            rank.emoji + " Rank: " + rank.name + "\n" +
            "⚽ Gols: " + (data.goals || 0) + "\n" +
            "🎯 Assistências: " + (data.assists || 0) + "\n" +
            "🏆 Vitórias: " + (data.wins || 0) + "\n" +
            "❌ Derrotas: " + (data.losses || 0) + "\n" +
            "📊 Partidas: " + (data.games || 0),
            player.id, 0x00BFFF
        );
        return false;
    }

    if (cmd == "!rank" || cmd == "!ranking") {
        var all = getAllPlayers();
        var sorted = all.sort(function(a, b) {
            return ((b.goals||0)+(b.assists||0)) - ((a.goals||0)+(a.assists||0));
        });
        var text = "🏆 TOP 5 JOGADORES:\n\n";
        sorted.slice(0, 5).forEach(function(data, i) {
            var rank = getRank(data);
            var pts = (data.goals||0) + (data.assists||0);
            text += (i+1) + ". " + rank.emoji + " " + data.name + " - " + pts + " pts\n";
        });
        room.sendAnnouncement(text, player.id, 0xFFD700);
        return false;
    }

    if (cmd == "!topgols") {
        var all = getAllPlayers();
        var sorted = all.sort(function(a, b) { return (b.goals||0) - (a.goals||0); });
        var text = "⚽ TOP 5 ARTILHEIROS:\n\n";
        sorted.slice(0, 5).forEach(function(data, i) {
            text += (i+1) + ". " + data.name + " - " + (data.goals||0) + " gols\n";
        });
        room.sendAnnouncement(text, player.id, 0xFFD700);
        return false;
    }

    if (cmd == "!topassists") {
        var all = getAllPlayers();
        var sorted = all.sort(function(a, b) { return (b.assists||0) - (a.assists||0); });
        var text = "🎯 TOP 5 ASSISTENTES:\n\n";
        sorted.slice(0, 5).forEach(function(data, i) {
            text += (i+1) + ". " + data.name + " - " + (data.assists||0) + " assistências\n";
        });
        room.sendAnnouncement(text, player.id, 0xFFD700);
        return false;
    }

    if (cmd == "!stats") {
        loadDB();
        room.sendAnnouncement(
            "📊 ESTATÍSTICAS DA SALA:\n\n" +
            "⚽ Total de Gols: " + (dbData.stats.totalGoals || 0) + "\n" +
            "🎯 Total de Assistências: " + (dbData.stats.totalAssists || 0) + "\n" +
            "🏆 Total de Partidas: " + (dbData.stats.totalGames || 0) + "\n" +
            "👥 Jogadores Cadastrados: " + Object.keys(dbData.players).length,
            player.id, 0x00BFFF
        );
        return false;
    }

    if (cmd == "!entrar") {
        if (addToQueue(player)) {
            room.sendAnnouncement("📋 " + player.name + " entrou na fila!", null, 0x00FF00);
            autoBalance();
        } else {
            room.sendAnnouncement("❌ Você já está na fila.", player.id, 0xFF0000);
        }
        return false;
    }

    if (cmd == "!sair") {
        removeFromQueue(player);
        room.sendAnnouncement("❌ " + player.name + " saiu da fila.", null, 0xFF0000);
        return false;
    }

    if (cmd == "!fila") {
        var q = getQueue();
        if (q.length == 0) {
            room.sendAnnouncement("📋 Fila vazia.", player.id, 0xFFA500);
            return false;
        }
        var players = room.getPlayerList();
        var text = "📋 FILA ATUAL:\n\n";
        q.forEach(function(id, i) {
            var p = players.find(function(x) { return x.id == id; });
            if (p) text += (i+1) + ". " + p.name + "\n";
        });
        room.sendAnnouncement(text, player.id, 0xFFA500);
        return false;
    }

    if (cmd == "!times") {
        var players = room.getPlayerList();
        var red = times.red.map(function(id) {
            var p = players.find(function(x) { return x.id === id; });
            return p ? p.name : '?';
        }).join(', ');
        var blue = times.blue.map(function(id) {
            var p = players.find(function(x) { return x.id === id; });
            return p ? p.name : '?';
        }).join(', ');
        room.sendAnnouncement(
            "🔴 Vermelho: " + (red || 'Vazio') + "\n" +
            "🔵 Azul: " + (blue || 'Vazio'),
            player.id, 0x00BFFF
        );
        return false;
    }

    if (cmd == "!gol") {
        var name = args.slice(1).join(' ');
        if (!name) {
            room.sendAnnouncement("⚽ Use: !gol nome_do_jogador", player.id, 0xFFA500);
            return false;
        }
        var players = room.getPlayerList();
        var scorer = players.find(function(p) { return p.name.toLowerCase() === name.toLowerCase(); });
        if (!scorer) {
            room.sendAnnouncement("❌ Jogador não encontrado!", player.id, 0xFF0000);
            return false;
        }
        addGoal(scorer.name);
        var team = room.getPlayerTeam(scorer.id);
        if (team === 1) placar.redGoals++;
        else if (team === 2) placar.blueGoals++;
        room.sendAnnouncement("⚽ GOL DE " + scorer.name + "!", null, 0x00FF00);
        if (placar.redGoals >= 5 || placar.blueGoals >= 5) {
            setTimeout(function() { endMatch(); }, 1000);
        }
        return false;
    }

    if (cmd == "!assist") {
        var name = args.slice(1).join(' ');
        if (!name) {
            room.sendAnnouncement("🎯 Use: !assist nome_do_jogador", player.id, 0xFFA500);
            return false;
        }
        var players = room.getPlayerList();
        var assistant = players.find(function(p) { return p.name.toLowerCase() === name.toLowerCase(); });
        if (!assistant) {
            room.sendAnnouncement("❌ Jogador não encontrado!", player.id, 0xFF0000);
            return false;
        }
        addAssist(assistant.name);
        room.sendAnnouncement("🎯 Assistência de " + assistant.name + "!", null, 0x00FF00);
        return false;
    }

    if (cmd == "!uni" || cmd == "!uniforme") {
        var name = args.slice(1).join(' ');
        if (!name) {
            room.sendAnnouncement("👕 Use: !uni nome_do_uniforme", player.id, 0xFFA500);
            return false;
        }
        var success = setUniform(room, player, name);
        if (success) {
            room.sendAnnouncement("👕 Uniforme alterado para " + name + "!", player.id, 0x00FF00);
        } else {
            room.sendAnnouncement("❌ Uniforme não encontrado! Use !unilist para ver os disponíveis.", player.id, 0xFF0000);
        }
        return false;
    }

    if (cmd == "!unilist") {
        var list = Object.keys(uniforms).join(', ');
        room.sendAnnouncement("👕 UNIFORMES DISPONÍVEIS:\n\n" + list, player.id, 0x00BFFF);
        return false;
    }

    if (cmd == "!formartimes" && player.admin) {
        forceBalance();
        room.sendAnnouncement("🔄 Times reformados!", null, 0x00FF00);
        return false;
    }

    if (cmd == "!resetdb" && player.admin) {
        localStorage.removeItem(DB_KEY);
        dbData = { players: {}, stats: { totalGoals: 0, totalAssists: 0, totalGames: 0 } };
        saveDB();
        room.sendAnnouncement("🔄 Banco de dados resetado!", null, 0xFF0000);
        return false;
    }

    if (cmd == "!kick" && player.admin) {
        var name = args.slice(1).join(' ');
        if (!name) {
            room.sendAnnouncement("🚫 Use: !kick nome_do_jogador", player.id, 0xFFA500);
            return false;
        }
        var players = room.getPlayerList();
        var target = players.find(function(p) { return p.name.toLowerCase() === name.toLowerCase(); });
        if (target) {
            room.kickPlayer(target.id, "Expulso por admin", false);
            room.sendAnnouncement("🚫 " + target.name + " foi expulso!", null, 0xFF0000);
        } else {
            room.sendAnnouncement("❌ Jogador não encontrado!", player.id, 0xFF0000);
        }
        return false;
    }

    if (cmd == "!admin" && player.admin) {
        var name = args.slice(1).join(' ');
        if (!name) {
            room.sendAnnouncement("👑 Use: !admin nome_do_jogador", player.id, 0xFFA500);
            return false;
        }
        var players = room.getPlayerList();
        var target = players.find(function(p) { return p.name.toLowerCase() === name.toLowerCase(); });
        if (target) {
            room.setPlayerAdmin(target.id, true);
            room.sendAnnouncement("👑 " + target.name + " agora é admin!", null, 0xFFD700);
        } else {
            room.sendAnnouncement("❌ Jogador não encontrado!", player.id, 0xFF0000);
        }
        return false;
    }

    if (!getProfile(player.name)) createProfile(player);
    lastActivity[player.id] = Date.now();
    rank = getRank(getProfile(player.name));
    formattedMessage = "[" + rank.emoji + " " + player.name + "]: " + message;
    room.sendAnnouncement(formattedMessage, null, 0xFFFFFF, "normal", 1);
    return false;
};

// =====================================
// INICIALIZA
// =====================================

loadDB();
console.log("✅ Servidor HaxLeague BR | 3v3 pronto!");
console.log("📊 " + Object.keys(dbData.players).length + " jogadores cadastrados!");
console.log("💡 Digite !help para ver os comandos!");

