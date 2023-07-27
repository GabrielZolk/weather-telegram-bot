const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

// const { Telegraf } = require('telegraf');

// const bot = new Telegraf('6255005947:AAGtTKSzoi2eVuykSn4OE0kyP2Zb9qbcX48');

// bot.start((ctx) => ctx.reply('Bem vindo ao Zolk Bot! xD'));
// bot.on('sticker', (ctx) => ctx.reply('😎'));
// bot.hears('Oi', (ctx) => ctx.reply('Olá! :)'));
// bot.launch()

const bot = new TelegramBot('6255005947:AAGtTKSzoi2eVuykSn4OE0kyP2Zb9qbcX48', { polling: true })

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userInput = msg.text;

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=f68e024893bb2ceed7fdaa1892f3f303`
        );
        const data = response.data;
        const weather = data.weather[0].description;
        const temperature = data.main.temp - 273.15;
        const city = data.name;
        const humidity = data.main.humidity;    
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;
        const message = `O tempo em ${city} é ${weather} com uma temperatura de ${temperature.toFixed(2)}°C. A umidade é ${humidity}%, a pressão é ${pressure}hPa, e a velocidade do vento é ${windSpeed}m/s. E a Melissa gosta de ver supernatural. (Ela é apaixonada no Dean 😂😍)`;

        bot.sendMessage(chatId, message);
    } catch (error) {
        bot.sendMessage(chatId, "Esta cidade não existe.");
        console.log(userInput)
    }
});
