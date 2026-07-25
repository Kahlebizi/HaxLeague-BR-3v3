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
       
        
       
        
        data = database.getProfile(player.name);
        rank = ranks.getRank(data);

        formattedMessage = "[" + rank.emoji + " " + displayName + "]: " + message;
        room.sendAnnouncement(formattedMessage, null, 0xFFFFFF, "normal", 1);
        return false;
    };
}

module.exports = {
    setupCommands
};
