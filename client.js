//write ur account information
const telegramuser = require('./modules/client')(
    98751427,                            // apiId
    "99571111523103335243524124422299",  // apiHash
    "MyFavBotname"                       // botid
);

const client = telegramuser.createConnection();

client.write("hello world!")

client.on('data', (data) => {
    console.log(`Data: ${data}`);
});

client.on("close", (data) => {
    console.log(":(") 
})
// setTimeout(()=> client.end(), 2000)
