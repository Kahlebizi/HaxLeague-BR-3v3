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