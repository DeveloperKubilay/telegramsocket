const telegrambot = require('./modules/serve')('5294567893:BBFYdRlp8EQ7ur8FwcyHYXZwD4jZi3b6lpo9'); // write ur bot token

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
