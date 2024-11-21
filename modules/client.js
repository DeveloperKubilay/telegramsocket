const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const EventEmitter = require('events');
const fs = require("fs");

let willgo = []
const sessions = {}

async function start(apiId, apiHash, botid){
    var Sessiontoken = "";
    if (fs.existsSync("session.str")) Sessiontoken = fs.readFileSync("session.str").toString();
    const session = new StringSession(Sessiontoken || "");
    const client = new TelegramClient(session, apiId, apiHash, {
        connectionRetries: 5,
        useWSS: true,
        maxReconnects: 100000000000000000000000000000000000000,
        retryDelay: 1000,
        logLevel: "none",
        autoReconnect: true,
    });

    if (!Sessiontoken) {
        await client.start({
            phoneNumber: async () => await input.text("Telefon numaranızı girin: "),
            password: async () => await input.text("Şifrenizi girin (varsa): "),
            phoneCode: async () => await input.text("Telefonunuza gelen doğrulama kodunu girin: "),
            onError: (err) => console.log(err),
        });

        fs.writeFileSync("session.str", session.save());
        console.log("Session String kaydedildi!");
    } else {
        console.log("Kaydedilmiş oturum yükleniyor...");
        await client.connect(); 
    }

    console.log("Giriş başarılı!");

    client.addEventHandler((update) => {
        if (update?.message) {
            client.downloadMedia(update.message.media?.document)
                .then(fileBuffer => {
                    const args = update.message.message.split(" ")
                    let sessionid = args[1]
                    if(args[0] == "Data"){
                        sessions[sessionid]?.emit('data', fileBuffer);
                    }else if(args[0] == "End"){
                        sessions[sessionid]?.emit('end', sessionid);
                        delete sessions[sessionid]
                    }
                }).catch(err => {});
        }
    });

    setInterval(async () => {
        if(willgo.length == 0) return;
        const data = willgo.shift()
        await client.sendMessage(botid,  {
            file: Buffer.from(data.message),
            message: data.type + data.id
        })
    }, 200);
}

return module.exports = function(apiId,apiHash,botid){
    start(apiId,apiHash, botid)
    return {
        createConnection: function(y){
            const server = new EventEmitter();
            server.id = Math.random().toString(36).substr(2, y || 10);
            sessions[server.id] = server;
            server.write = function(data) {
                willgo.push({id: server.id, message: data, type: "Newconnection "});
                server.write = function(data) {
                    willgo.push({id: server.id, message: data, type: "Data "});
                }
            }
            server.end = function() {
                willgo.push({id: server.id, message: server.id, type: "End "});
            }
            return server;
        }
    }
}