# 🔥 Telegram Socket Connection Module 💬

> This module creates a seamless socket-like connection between your Telegram bot and personal account, allowing real-time bidirectional communication with simple commands. Perfect for automated messaging and interactive applications! 🔌


## 📲 Installation

```bash
npm i telegram node-telegram-bot-api axios
```

## 👤 Client Side (Your Telegram Account)

Connect your personal Telegram account using this code:

```js
// drop your account details here
const telegramuser = require('./modules/client')(
    98751427,                            // apiId
    "99571111523103335243524124422299",  // apiHash
    "MyFavBotname"                       // botid
);

const client = telegramuser.createConnection();
// client.id is available if you need it

// send messages like this
client.write("hello world!")

// listen for incoming messages
client.on('data', (data) => {
    console.log(`Data: ${data}`);
});

// handle disconnections
client.on("close", (id) => {
    console.log(":(") 
})

// if you wanna close the connection manually:
// setTimeout(()=> client.end(), 2000)
```

## 🤖 Server Side (Telegram Bot)

Set up your bot to handle connections:

```js
const telegrambot = require('./modules/serve')('5294567893:BBFYdRlp8...'); // your bot token goes here

telegrambot.on('connection', (client) => {
    // client.id is available here too
    
    console.log(`Connection sucsess`);
    client.write("yo whatspp")
        
    client.on('data', (data) => {
        console.log("my bro sayed "+data);
    });

    client.on('close', (id) => {
        console.log(`:/`);
    });
   // setTimeout(()=> client.end(), 2000)
});
```

## ℹ️ How It Works

This module creates a socket-like connection between your Telegram account and bot.
You can send and receive messages as if working with standard sockets. No cap! 💯

## 📝 Note

Make sure to get your API credentials from [my.telegram.org](https://my.telegram.org) and bot token from [@BotFather](https://t.me/botfather).

## Made with ❤️ by DeveloperKubilay
