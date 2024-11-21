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
