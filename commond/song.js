const ytdl = require('ytdl-core');
const fs = require('fs');

client.on('message', async message => {
    const text = message.body;

    if(text.startsWith('.song')){
        const url = text.split(' ')[1];
        if(!url){
            return message.reply('Please provide a video URL!');
        }

        // YouTube video check
        if(!ytdl.validateURL(url)){
            return message.reply('Invalid YouTube URL!');
        }

        message.reply('Downloading audio... 🎵');

        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        const stream = ytdl(url, { filter: 'audioonly' });

        const pathFile = `./${title}.mp3`;
        stream.pipe(fs.createWriteStream(pathFile));

        stream.on('end', async () => {
            await message.reply(fs.readFileSync(pathFile), null, { sendAudioAsVoice: false, filename: `${title}.mp3` });
            fs.unlinkSync(pathFile); // temp file remove
        });
    }
});
