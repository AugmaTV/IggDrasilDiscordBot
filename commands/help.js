const Discord = require('discord.js');
var config = require('../config_bot.json');

module.exports = {
    name: 'help',
    description: 'Liste des commandes',
    execute(message, args, authorId) {
        var embed = new Discord.MessageEmbed();
        embed.setTitle(`IggDrasil Bot Help`)
        .setColor("RANDOM")
        .addField("Préfix", config.prefix, true)
        .addField("Commande", "help : Liste des commandes\niggdrasil : info du serveur en temp réel", true)
        .setThumbnail(message.guild.iconURL())
        .setFooter("Made By AugmaDev#4544")

        message.channel.send(embed);
    }
}