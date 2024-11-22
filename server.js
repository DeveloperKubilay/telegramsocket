const telegrambot = require('./modules/serve')('5294567893:BBFYdRlp8EQ7ur8FwcyHYXZwD4jZi3b6lpo9'); // write ur bot token

telegrambot.on('connection', (client) => {
    
    console.log(`Connection sucsess`);
    client.write("yo whatspp")
        
    client.on('data', (data) => {
        console.log("my bro sayed "+data);
    });

    client.on('close', (data) => {
        console.log(`:/`);
    });
   // setTimeout(()=> client.end(), 2000)
});
