const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

// QR code scan
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan this QR code in WhatsApp to connect the bot!');
});

// Bot ready
client.on('ready', () => {
    console.log('Prabat MD style WhatsApp Bot is ready!');
});

// Message handler
client.on('message', message => {
    const text = message.body.toLowerCase();

    // .alive command
    if(text === '.alive'){
        message.reply(
`╔═══〘 *ALIVE STATUS* 〙═══
║ Bot is *Online & Active* ✅
║ Developer: ZYAA MD
║ Version: 1.0.0
╚═════════════════`
        );
    }

    // .menu command
    else if(text === '.menu'){
        message.reply(
`╔═══〘 *PRABAT MD MENU* 〙═══
║ 1. .alive - Check if bot is alive
║ 2. .system - System info
║ 3. .help - List of commands
╚═════════════════`
        );
    }

    // .system command
    else if(text === '.system'){
        message.reply(
`╔═══〘 *SYSTEM INFO* 〙═══
║ OS: Node.js
║ Library: whatsapp-web.js
║ Status: Running
╚═════════════════`
        );
    }

    // Unknown command
    else if(text.startsWith('.')){
        message.reply('❌ Unknown command. Type .menu to see available commands.');
    }
});

client.initialize();
