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

module.exports = {
    addToQueue,
    removeFromQueue,
    getQueue,
    isInQueue,
    clearQueue,
    getCurrentTeams,
    getMatchStats,
    getGameMode,
    balanceTeams,
    autoBalance,
    handleSubstitution,
    updateTeams,
    clearTeams,
    startPick,
    pickPlayer,
    getCaptain,
    isPicking,
    getPickedPlayers,
    endMatch,
    forceBalance,
    onTeamGoal,
    onGameTick,
    onPlayerActivity,
    onPlayerJoin,
    onPlayerLeave,
    queue,
    captain,
    picking,
    pickedPlayers,
    currentTeams,
    matchStats,
    matchInProgress
};