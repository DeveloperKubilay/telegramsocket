const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const EventEmitter = require('events');
process.env.NTBA_FIX_350 = true;

return module.exports = function(token){

 const server = new EventEmitter();
 const bot = new TelegramBot(token, { polling: true});
 
 const session = {}
 const sessionchannel = {}
 
 function doend(sessionid){
     session[sessionid]?.emit('close', sessionid);
     delete session[sessionid]
     delete sessionchannel[sessionid]
     return true;
 }
 
 bot.on('message', async (msg) => {
     if (msg.document) {
         const file = await bot.getFile(msg.document.file_id);
         const response = await axios({
             method: 'get',
             url: `https://api.telegram.org/file/bot${token}/${file.file_path}`,
             responseType: 'arraybuffer'
         });
 
         if(!msg.caption) return;
 
         const args = msg.caption.split(" ")
         let sessionid = args[1]
         sessionchannel[sessionid] = msg.chat.id
 
         if(args[0] == "Newconnection") {
             const newevent = new EventEmitter();
             newevent.id = sessionid;
             newevent.end = ()=> doend(sessionid)
 
             session[sessionid] = newevent
             newevent.write = function(data) {
                 const session2 = willgo.find((data) => data.name === sessionid)
                 if(!session2) willgo.push({id: msg.chat.id, type:"Data ", name: sessionid, message: data});
                 else {
                     session2.message = Buffer.concat([session2.message, data])
                 }
             }
             
             server.emit('connection',newevent);
             newevent.emit('data',response.data);
         }else if(args[0] == "Data") {
             session[sessionid]?.emit('data', response.data);
         } else if(args[0] == "End") return doend(sessionid)
     }
 });
 
 
 let willgo = []
 setInterval(() => {
     if(willgo.length == 0) return;
     const data = willgo.shift()
     bot.sendDocument(data.id, Buffer.from(data.message), {
         caption: data.type+data.name
     }).catch(()=> {});
 }, 200);

 return server;
}
