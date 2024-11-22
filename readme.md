# Its basic connection module for telegram

## Client ur telegram account
```js
//write ur account information
const telegramuser = require('./modules/client')(
    98751427,                            // apiId
    "99571111523103335243524124422299",  // apiHash
    "MyFavBotname"                       // botid
);

const clinent = telegramuser.createConnection();
clinent.write("hello world!")
clinent.on('data', (data) => {
    console.log(`Data: ${data}`);
});
clinent.on("end", (data) => {
    console.log(":(") 
})
```
## Server  (telegram bot)
```js
const telegrambot = require('./modules/serve')('5294567893:BBFYdRlp8EQ7ur8Fwcy...'); // write ur bot token

telegrambot.on('connection', (client) => {
    client.write("yo whatspp")
    
    console.log(`Connection sucsess`);
    client.on('data', (data) => {
        console.log("my bro sayed "+data);
    });
    client.on('end', (data) => {
        console.log(`:/`);
    });

}); 
```
