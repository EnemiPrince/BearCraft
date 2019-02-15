const Discord = require('discord.js');
const clinet = new Discord.Client();

client.on('ready', () => {
    console.log('Funguju');
});

client.on('message', message => {
    if (message.content === 'ping') {
        message.reply('pong');
     }
});

client.login(process.env.BOT_TOKEN);
