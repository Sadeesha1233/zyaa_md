const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

const client = new Client();

// commands folder එකේ සියලු files load කරන්න
const commands = {};
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'));
for (const file of commandFiles){
    const cmd = require(`./commands/${file}`);
    commands[cmd.command] = cmd.reply;
}

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan this QR code in WhatsApp.');
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', message => {
    const text = message.body.toLowerCase();

    if(commands[text]){
        message.reply(commands[text]);
    } else if(text.startsWith('.')){
        message.reply('❌ Unknown command. Type .menu to see commands.');
    }
});

client.initialize();
