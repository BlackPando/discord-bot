const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true,
        partials: ['MESSAGE', 'REACTION']
    }),
    config = require('./config.json'),
    fs = require('fs')

client.login(config.token);

const prefix = "!";

client.on("ready", async () =>{
    console.log("On");
    client.user.setStatus("dnd");
    setTimeout(() => {
        client.user.setActivity("!help", {type: 'LISTENING'});
    }, 100)

});

client.on('guildMemberAdd', member =>{
    var i = "551078217004613642";
    let role = guildMember.guild.roles.cache.find(r => r.id === i);
    guildMember.roles.add(role);
})

client.on('messageReactionAdd', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reaction.users.remove(user)
})
 
client.on('messageReactionRemove', (reaction, user) => {
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem || !reactionRoleElem.removable) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})

client.on("message", message =>{
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.content.startsWith(prefix)){
        if(!message.member.hasPermission("ADMINISTRATOR")){
            if(message.channel.name != "🚦】bot"){
                message.delete();
                message.channel.send(message.author.username +", seul le channel "+ message.guild.channels.cache.get('858682028195184671').toString() +" est autorisé pour l'usage des commandes | !help");
                return;
            }
        } 
        
    }
    if(message.content.startsWith(prefix + "help")){
        message.channel.send("Pour l'instant, aucune commande n'a été enregistrée.")
        return;
    }

    if(message.content.startsWith(prefix + "règlement")){
        message.delete();
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        var embed = new Discord.MessageEmbed()
        .setColor("#00ac02")
        .setTitle("Règlement du serveur")
        .setDescription("\nLe non respect du règlement pourra entraîner des sanctions plus ou moins conséquentes selon la gravité de la faute ! Merci de l'approuver à l'aide de ✅")
        .addField("Les règles","\n- Le respect est primordial envers chaque membre du serveur.\n- Pas de sujet politique, religieux ou nsfw (-18)\n- Pas de spam\n- Pas de mentions inutiles (surtout @BlackPando @Modérateurs )\n- Pas de publicité, sous n'importe quelle forme (implicite, message privé, etc)\n- Pas de vol d'identité/vol de pseudo/pseudo offensant\n- Respectez l'utilité des différents channels", false)

        message.channel.send(embed)
            .then (message =>{
            message.react("✅");
        })
        return;
    }
    if(message.content.startsWith(prefix + "notifs")){
        message.delete();
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        var embed = new Discord.MessageEmbed()
        .setColor("#00C7FF")
        .setTitle("Notifications du serveur")
        .setDescription("\nConfigure les notifications que tu souhaites recevoir grâce aux réactions !")
        message.channel.send(embed)
            .then (message =>{
            message.react("📕");
            message.react("📘");
            message.react("📗");
        })
        return;

    }
    if(message.content.startsWith(prefix + "rôles")){
        message.delete();
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        var embed = new Discord.MessageEmbed()
        .setColor("#df04b8")
        .setTitle("Les différents grades obtenables")
        .setDescription("@Iron grade par défaut\n@Gold pour les gens actifs sur le discord, en commentaires ou dans le chat twitch\n@Subs grade gold pour les abonnés twitch\n@VIP grade spécifique relié avec le VIP de twitch\n@Modérateurs ouvert sur candidature")
        message.channel.send(embed);
        return;
    }

    if(message.content.startsWith(prefix + "réseaux")){
        message.delete();
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        var youtube = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle("La chaîne Youtube principale")
        .setDescription("La chaîne avec certainement le moins d'activité, mais les vidéos en valent la peine !")
        .setURL("https://www.youtube.com/channel/UCtX5GOxSBOdf3SR5knvCD5g")

        var twitch = new Discord.MessageEmbed()
        .setColor("#6400ff")
        .setTitle("La chaîne des lives, Twitch")
        .setDescription("Tous les mardi, jeudi et samedi il y a des lives à partir de 17h30 ! Ne les rate pas")
        .setURL("https://www.twitch.tv/blackpando66")

        var tiktok = new Discord.MessageEmbed()
        .setColor("#66ff7f")
        .setTitle("Le TikTok")
        .setDescription("Des vidéos chaque jour à 16h, que demande le peuple?")
        .setURL("https://www.tiktok.com/@pandiktok_")

        var youtube2 = new Discord.MessageEmbed()
        .setColor("#66ff7f")
        .setTitle("La chaîne YouTube Shorts ")
        .setDescription("L'équivalent du TikTok, version Youtube")
        .setURL("https://www.youtube.com/channel/UCyX0ocQiqUdWaPl0Jv6bc1A")

        var twitter = new Discord.MessageEmbed()
        .setColor("#35c2ff")
        .setTitle("Le Twitter")
        .setDescription("Pour les gens vraiment motivés...")
        .setURL("https://twitter.com/BlackPando_Offi")

        message.channel.send(youtube);
        message.channel.send(twitch);
        message.channel.send(tiktok);
        message.channel.send(youtube2);
        message.channel.send(twitter);

    }
    return;
    
})

client.login(process.env.TOKEN);