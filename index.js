const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const commands = require('./commands');

const client = new Client();

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
