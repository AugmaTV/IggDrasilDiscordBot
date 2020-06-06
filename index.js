const Discord = require('discord.js');
const client = new Discord.Client();
const API = require("./api_key.json");
const settings = require("./config_bot.json");
const mc = require("./api/minestat");
const fs = require("fs");
var status = "";

function activity() {
    mc.init("minecraft3133.omgserv.com", "10007", function(result) {
        if(mc.online) {
            status =  `${mc.current_players}/${mc.max_players} joueurs sur IggDrasil`;
            client.user.setActivity(status, { type: "PLAYING" });
        } else {
            status = "serveur éteint";
            client.user.setActivity(status, { type: "PLAYING" });
        }
    });
}

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.setInterval(activity, 10000);
});

client.on("guildMemberAdd", (member) => {
    let channelW = client.channels.cache.get('685242280331706418');
    let embedW = new Discord.MessageEmbed();

    embedW.setTitle(`Bienvenue à ${member.user.tag} sur IggDrasil France !`)
    .setColor("RANDOM")
    .setDescription(`Vas accepter le ${client.channels.cache.get("685244016022781979").toString()} 😉.\nAmuse toi bien sur IggDrasil France !`)
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter("Made by AugmaDev#4544");

    channelW.send(embedW);
});

client.on('message', msg => {
    let author = msg.author;
    let authorId = author.id;
    if(author.bot) return;

    if (msg.content.startsWith(settings.prefix)) {
        const args = msg.content.slice(settings.prefix.length).split(/ +/); // sépare et mes les arguments dans un tableau
        const commandName = args.shift().toLowerCase(); // la commande sans prefix

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);
        try {
            command.execute(msg, args, authorId);
        } catch (error) {
            console.error(error);
            msg.reply('erreur dans l\'éxecution de la commande!');
        }
    }
});

client.login(API.discord);