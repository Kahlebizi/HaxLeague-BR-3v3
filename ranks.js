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

module.exports = {
    getRank,
    getRankTag,
    getRankEmoji,
    getRankName,
    getParticipacoes,
    getNextRank,
    getProgressToNext,
    getGlobalRank,
    getRankPosition,
    getRankStats
};