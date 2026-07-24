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

function onPlayerJoin(room, player, database) {
    lastActivity[player.id] = Date.now();
    
    if (!database.getProfile(player.name)) {
        database.createProfile(player);
    }
    
    let rank = database.getRank(database.getProfile(player.name));
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

function onTeamGoal(room, database) {
    if (touchHistory.length == 0) return;

    let players = room.getPlayerList();
    let scorerId = touchHistory[touchHistory.length - 1];
    let scorer = players.find(p => p.id == scorerId);

    if (!scorer) return;

    database.addGoal(scorer.name);

    let message = getRandomMessage(GOAL_MESSAGES);
    message = message.replace("{player}", scorer.name);

    let assistId = touchHistory[touchHistory.length - 2];
    let assist = players.find(p => p.id == assistId);

    if (assist && assist.team == scorer.team && assist.id != scorer.id) {
        database.addAssist(assist.name);
        let assistMsg = getRandomMessage(ASSIST_MESSAGES);
        assistMsg = assistMsg.replace("{assist}", assist.name).replace("{scorer}", scorer.name);
        message += "\n" + assistMsg;
    }

    message += "\n⚽ Velocidade: " + lastBallSpeed + " km/h";

    room.sendAnnouncement(message, null, 0xFFD700, "bold");

    touchHistory = [];
    lastBallSpeed = 0;
}

function startAFK(room) {
    setInterval(function() {
        let players = room.getPlayerList();
        if (!players) return;

        players.forEach(function(player) {
            if (player.team == 0) return;

            let inactive = Date.now() - (lastActivity[player.id] || Date.now());

            if (inactive >= 60000 && !afkWarning[player.id]) {
                afkWarning[player.id] = true;
                room.sendAnnouncement(
                    "⚠️ " + player.name + ", você está parado! Se não se mexer nos próximos 10 segundos será kickado.",
                    player.id,
                    0xFFAA00,
                    "bold"
                );
            }

            if (inactive >= 70000 && afkWarning[player.id]) {
                room.kickPlayer(player.id, "AFK", false);
                delete lastActivity[player.id];
                delete afkWarning[player.id];
            }
        });
    }, 1000);
}

module.exports = {
    onPlayerJoin,
    onPlayerLeave,
    onPlayerActivity,
    onPlayerBallKick,
    onTeamGoal,
    startAFK,
    getBallSpeed,
    touchHistory,
    lastActivity,
    afkWarning
};
