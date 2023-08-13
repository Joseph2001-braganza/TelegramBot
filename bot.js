const { Telegraf } = require('telegraf');
const request = require('request');
const cheerio = require('cheerio');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Read This Properly Type : "exam" in the general input of telegram and send it to the bot the bot will respond'));
// bot.help((ctx) => ctx.reply('Send me a sticker'));

bot.command('/start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {
    })
})

bot.hears('exam', ctx => {
    console.log(ctx.from)
    let animalMessage = `Great ,Less Go and Study Here are Your Upcoming Exams Select the One which you want the PYQ`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "BITSAT",
                        callback_data: 'bitsat'
                    },
                    {
                        text: "COMEDK",
                        callback_data: 'comedk'
                    }
                ],

            ]
        }
    })
})

//method that returns image of a dog
bot.action('bitsat', async ctx => {
    const url = 'https://www.examsnet.com/exams/bitsat-previous-question-papers-online';
    const RedirectUrl='https://www.examsnet.com'
    await request(url,(error, response, body) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(body);
            const links = $('a');
            bot.telegram.sendMessage(ctx.chat.id,"Here You Go with BITSAT PAPERS Sarke Kor")
            links.each((i, link) => {
                const href = $(link).attr('href');
                if (href && href.match(/^\/test\//)) {
                    const messageText = RedirectUrl + href;
                    if (messageText.trim().length > 0) {
                        bot.telegram.sendMessage(ctx.chat.id, messageText);
                    }
                }
            });
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            //"res/dguq1.jpg"
            bot.telegram.sendPhoto(ctx.chat.id, {
                source: `res/dguq${randomNumber}.jpeg`
            })
        }
    });
    bot.start((ctx) => ctx.reply('Read This Properly Type : "exam" in the general input of telegram and send it to the bot the bot will respond'));
})
//method that returns image of a cat 
bot.action('comedk', async ctx => {
    const url="https://www.examsnet.com/exams/comedk-exam-previous-question-papers-online";
    const RedirectUrl='https://www.examsnet.com';
    await request(url,(error,response,body)=>{
        if(!error && response.statusCode==200){
            const $=cheerio.load(body);
            const links=$('a');
            bot.telegram.sendMessage(ctx.chat.id,"Here You Go with COMEDK PAPERS Sarke Kor")
            links.each((i,link)=>{
                const href=$(link).attr('href');
                if(href && href.match(/^\/test\//)){
                    const messageText=RedirectUrl+href;
                    if(messageText.trim().length>0){
                        bot.telegram.sendMessage(ctx.chat.id,messageText)
                    }
                }
            })
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            bot.start((ctx) => ctx.reply('Read This Properly Type : "exam" in the general input of telegram and send it to the bot the bot will respond'));
            //"res/dguq1.jpg"
            bot.telegram.sendPhoto(ctx.chat.id, {
                source: `res/dguq${randomNumber}.jpeg`
            })
        }
    })
    bot.start((ctx) => ctx.reply('Read This Properly Type : "exam" in the general input of telegram and send it to the bot the bot will respond'));
})

bot.hears('jane',(ctx)=>{
    bot.telegram.sendMessage(ctx.chat.id,"Kaam kor go lolyaa lisanva kor , Yevun maar ghaltolo...")
    bot.telegram.sendSticker(ctx.chat.id,"https://media.giphy.com/media/3o7aD8tLEAz7oDjT8s/giphy.webp")
})

bot.launch();