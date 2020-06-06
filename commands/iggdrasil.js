const Discord = require('discord.js');
var mc = require('../api/minestat');

module.exports = {
    name: 'iggdrasil',
    description: 'Info du serveur',
    execute(message, args, authorId) {
        mc.init("minecraft3133.omgserv.com", "10007", function(result) {
            if(mc.online) {
                status =  `${mc.current_players}/${mc.max_players} joueurs sur IggDrasil`;
                message.reply(status);
            } else {
                status = "serveur éteint";
                message.reply(status);
            }
        });
    }
}