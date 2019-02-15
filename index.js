////////// Funkce ////////////
const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Nenalezeno!")
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} načten!`);
        bot.commands.set(props.help.name, props);
    });

})

////////////// Oznámení + online systém /////////////
bot.on("ready", async () => {
    console.log(`${bot.user.username} je nyní online!`);
    //bot.user.setGame("Pracujeme na serveru!")
    //bot.user.setGame("Pracujeme na botu!")

    bot.user.setActivity("Pracujeme na botu!!", {type: "WATCHING"});

});
////////// Zasílání zpráv BOTA /////////////
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

});

bot.login(process.env.NTM5MTY2NzA3NjY3OTU5ODQw.Dy-ZrA.IbkWHsqeUz4nk8RZUn_TjxCyrT0);
