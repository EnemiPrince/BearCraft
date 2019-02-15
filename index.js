////////// Funkce ////////////
const clientconfig = require("./clientconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true});
const fs = require("fs");
client.commands = new Discord.Collection();

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
        client.commands.set(props.help.name, props);
    });

})

////////////// Oznámení + online systém /////////////
client.on("ready", async () => {
    console.log(`${client.user.username} je nyní online!`);
    //client.user.setGame("Pracujeme na serveru!")
    //client.user.setGame("Pracujeme na clientu!")

    client.user.setActivity("Pracujeme na clientu!!", {type: "WATCHING"});

});
////////// Zasílání zpráv clientA /////////////
client.on("message", async message => {
    if(message.author.client) return;
    if(message.channel.type === "dm") return;

    let prefix = clientconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);

});

client.login(process.env.NTM5MTY2NzA3NjY3OTU5ODQw.Dy-ZrA.IbkWHsqeUz4nk8RZUn_TjxCyrT0);
