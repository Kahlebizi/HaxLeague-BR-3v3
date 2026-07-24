// =====================================
// HaxLeague BR | 3v3 - VERSÃO COMPLETA
// =====================================

var room = HBInit({
    roomName: "HaxLeague BR | 3v3",
    maxPlayers: 20,
    noPlayer: true
});

// =====================================
// ESTÁDIO PERSONALIZADO - FUTSAL
// =====================================

var mapa = {
    "name": "HaxLeague BR Arena",
    "width": 620,
    "height": 270,
    "spawnDistance": 350,
    "bg": {
        "type": "hockey",
        "width": 550,
        "height": 240,
        "kickOffRadius": 80,
        "cornerRadius": 0
    },
    "vertexes": [
        {"x": 550, "y": 240, "trait": "ballArea"},
        {"x": 550, "y": -240, "trait": "ballArea"},
        {"x": 0, "y": 270, "trait": "kickOffBarrier"},
        {"x": 0, "y": 80, "bCoef": 0.15, "trait": "kickOffBarrier", "color": "F8F8F8", "vis": true, "curve": 180},
        {"x": 0, "y": -80, "bCoef": 0.15, "trait": "kickOffBarrier", "color": "F8F8F8", "vis": true, "curve": 180},
        {"x": 0, "y": -270, "trait": "kickOffBarrier"},
        {"x": -550, "y": -80, "cMask": ["red","blue","ball"], "trait": "goalNet", "curve": 0, "color": "F8F8F8", "pos": [-700,-80]},
        {"x": -590, "y": -80, "cMask": ["red","blue","ball"], "trait": "goalNet", "curve": 0, "color": "F8F8F8", "pos": [-700,-80]},
        {"x": -590, "y": 80, "cMask": ["red","blue","ball"], "trait": "goalNet", "curve": 0, "color": "F8F8F8", "pos": [-700,80]},
        {"x": -550, "y": 80, "cMask": ["red","blue","ball"], "trait": "goalNet", "curve": 0, "color": "F8F8F8", "pos": [-700,80]},
        {"x": 550, "y": -80, "cMask": ["red","blue","ball"], "trait": "goalNet", "curve": 0, "color": "F8F8F8", "pos": [700,-80]},
        {"x": 590, "y": -80, "cMask": ["red","blue","ball"], "trait": "goalNet", "curve": 0, "color": "F8F8F8", "pos": [700,-80]},
        {"x": 590, "y": 80, "cMask": ["red","blue","ball"], "trait": "goalNet", "curve": 0, "color": "F8F8F8", "pos": [700,80]},
        {"x": 550, "y": 80, "cMask": ["red","blue","ball"], "trait": "goalNet", "curve": 0, "color": "F8F8F8", "pos": [700,80]},
        {"x": -550, "y": -240, "trait": "ballArea"},
        {"x": -550, "y": 240, "trait": "ballArea"}
    ],
    "segments": [
        {"v0": 0, "v1": 1, "bCoef": 1, "trait": "ballArea"},
        {"v0": 2, "v1": 3, "trait": "kickOffBarrier"},
        {"v0": 3, "v1": 4, "trait": "kickOffBarrier", "curve": 180},
        {"v0": 4, "v1": 5, "trait": "kickOffBarrier"},
        {"v0": 6, "v1": 7, "trait": "goalNet"},
        {"v0": 7, "v1": 8, "trait": "goalNet"},
        {"v0": 8, "v1": 9, "trait": "goalNet"},
        {"v0": 10, "v1": 11, "trait": "goalNet"},
        {"v0": 11, "v1": 12, "trait": "goalNet"},
        {"v0": 12, "v1": 13, "trait": "goalNet"},
        {"v0": 14, "v1": 15, "bCoef": 1, "trait": "ballArea"},
        {"v0": 14, "v1": 6, "bCoef": 1, "trait": "ballArea"},
        {"v0": 9, "v1": 15, "bCoef": 1, "trait": "ballArea"},
        {"v0": 1, "v1": 10, "bCoef": 1, "trait": "ballArea"},
        {"v0": 13, "v1": 0, "bCoef": 1, "trait": "ballArea"}
    ],
    "goals": [
        {"p0": [-550, 80], "p1": [-550, -80], "team": "red"},
        {"p0": [550, -80], "p1": [550, 80], "team": "blue"}
    ],
    "discProperties": [
        {"pos": [-550, -80], "color": "FF6666", "trait": "goalPost"},
        {"pos": [-550, 80], "color": "FF6666", "trait": "goalPost", "y": -80, "x": -560},
        {"radius": 5, "pos": [550, 80], "color": "6666FF", "trait": "goalPost", "y": 80},
        {"radius": 5, "pos": [550, -80], "color": "6666FF", "trait": "goalPost", "y": -80},
        {"radius": 3, "invMass": 0, "pos": [-550, 240], "color": "FFCC00", "bCoef": 0.1, "trait": "line"},
        {"radius": 3, "invMass": 0, "pos": [-550, -240], "color": "FFCC00", "bCoef": 0.1, "trait": "line"},
        {"radius": 3, "invMass": 0, "pos": [550, -240], "color": "FFCC00", "bCoef": 0.1, "trait": "line"},
        {"radius": 3, "invMass": 0, "pos": [550, 240], "color": "FFCC00", "bCoef": 0.1, "trait": "line"}
    ],
    "planes": [
        {"normal": [0, 1], "dist": -240, "bCoef": 1, "trait": "ballArea", "vis": false, "curve": 0},
        {"normal": [0, -1], "dist": -240, "bCoef": 1, "trait": "ballArea"},
        {"normal": [0, 1], "dist": -270, "bCoef": 0.1},
        {"normal": [0, -1], "dist": -270, "bCoef": 0.1},
        {"normal": [1, 0], "dist": -620, "bCoef": 0.1},
        {"normal": [-1, 0], "dist": -620, "bCoef": 0.1},
        {"normal": [1, 0], "dist": -590, "bCoef": 0.1, "trait": "goalNet"},
        {"normal": [-1, 0], "dist": -590, "bCoef": 0.1, "trait": "goalNet"}
    ],
    "traits": {
        "ballArea": {"vis": false, "bCoef": 1, "cMask": ["ball"]},
        "goalPost": {"radius": 8, "invMass": 0, "bCoef": 0.5},
        "goalNet": {"vis": true, "bCoef": 0.1, "cMask": ["ball"]},
        "line": {"vis": true, "bCoef": 0.1, "cMask": [""]},
        "kickOffBarrier": {"vis": false, "bCoef": 0.1, "cGroup": ["redKO", "blueKO"], "cMask": ["red", "blue"]}
    },
    "playerPhysics": {"bCoef": 0, "acceleration": 0.11, "kickingAcceleration": 0.083, "kickStrength": 5},
    "ballPhysics": {"radius": 6.25, "bCoef": 0.4, "invMass": 1.5, "damping": 0.99, "color": "FFCC00"}
};

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
    players.forEach(function(p) { room.setTeam(p.id, 0); });
    times.red = [];
    times.blue = [];
}

function updateTeams() {
    var players = room.getPlayerList();
    players.forEach(function(p) { room.setTeam(p.id, 0); });
    times.red.forEach(function(id) { room.setTeam(id, 1); });
    times.blue.forEach(function(id) { room.setTeam(id, 2); });
}

function formRandomTeams() {
    var players = room.getPlayerList();
    var shuffled = [...players].sort(function() { return Math.random() - 0.5; });
    clearTeams();

    var numPlayers = shuffled.length;
    var teamSize = 1;
    if (numPlayers >= 6) teamSize = 3;
    else if (numPlayers >= 4) teamSize = 2;
    else if (numPlayers >= 2) teamSize = 1;
    else return;

    var redTeam = [];
    var blueTeam = [];

    shuffled.forEach(function(p, index) {
        if (index < teamSize) redTeam.push(p.id);
        else if (index < teamSize * 2) blueTeam.push(p.id);
    });

    var extraPlayers = shuffled.slice(teamSize * 2);
    extraPlayers.forEach(function(p) {
        if (!fila.includes(p.id)) fila.push(p.id);
    });

    times.red = redTeam;
    times.blue = blueTeam;
    updateTeams();

    var redNames = redTeam.map(function(id) {
        var p = players.find(function(x) { return x.id === id; });
        return p ? p.name : '?';
    }).join(', ');
    var blueNames = blueTeam.map(function(id) {
        var p = players.find(function(x) { return x.id === id; });
        return p ? p.name : '?';
    }).join(', ');

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

function onTeamGoal(room, team) {
    if (touchHistory.length == 0) return;
    var players = room.getPlayerList();
    var scorerId = touchHistory[touchHistory.length - 1];
    var scorer = players.find(function(p) { return p.id == scorerId; });
    if (!scorer) return;

    addGoal(scorer.name);
    room.sendAnnouncement("⚽ GOL DE " + scorer.name + "!", null, 0xFFD700);

    if (team === 1) placar.redGoals++;
    else if (team === 2) placar.blueGoals++;

    if (placar.redGoals >= 5 || placar.blueGoals >= 5) {
        setTimeout(function() { endMatch(); }, 1000);
    }
    touchHistory = [];
}

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
    room.sendAnnouncement("👋 Bem-vindo " + rank.emoji + " " + player.name + "! Digite !help", player.id, 0x00BFFF);
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

    return true;
};

// =====================================
// INICIALIZA
// =====================================

loadDB();
startAFK();
console.log("✅ Servidor HaxLeague BR | 3v3 pronto!");
console.log("📊 " + Object.keys(dbData.players).length + " jogadores cadastrados!");
console.log("💡 Digite !help para ver os comandos!");
