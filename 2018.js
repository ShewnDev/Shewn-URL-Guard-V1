//'Shewn?#2018 Tarafından yapılmıştır çalmayın kullanın :)
const { Client, Discord } = require('discord.js');
const request = require('request');
const client = new Client();
const config = require("./config.json")



client.on("ready", async  => {

let restart = client.channels.cache.get(config.URLog)
let BotVoiceKe = client.channels.cache.get(config.BotVoice);
if (BotVoiceKe) BotVoiceKe.join().catch(err => console.error("Salak Botun Ses Kanalına Bağlanamadı Git Yetkisini VS. Gözden Geçir!"));
client.user.setPresence({ activity: { name: config.Activity, type: config.Type }, status: config.Status })
restart.send(`\`\`\`${client.user.username} yeniden başlatıldı.\n\nKorunacak URL: ${config.GuildURL}\`\`\``)
});


//'Shewn?#2018 Tarafından yapılmıştır çalmayın kullanın :)
client.on('guildUpdate', async (oldGuild, newGuild) => {

if (oldGuild.vanityURLCode === newGuild.vanityURLCode) return;
let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(logs => logs.entries.first());
if (!entry.executor || entry.executor.id === client.user.id || !newGuild.members.cache.get(entry.executor.id).bannable) return;
let channel = client.channels.cache.get(config.URLog);
if (channel) channel.send(`@everyone\n${entry.executor} adlı kişi url'yi değiştirmeye çalıştığı için uzaklaştırıldı url \`${oldGuild.vanityURLCode}\` haline geri getirildi.`)

if (!channel) return
newGuild.members.ban(entry.executor.id, {reason: `${entry.executor.tag} Adlı kullanıcı izinsiz URL değiştirmek sebebi ile banlandı!`});
//'Shewn?#2018 Tarafından yapılmıştır çalmayın kullanın :)

const AYARLAR = {
    //url: `https://discord.com/api/v6/guilds/${newGuild.id}/vanity-url`, #Arkadaşlar ben v9 kullandım siz istediğinizi kullanabilirsiniz!
    //json: true,
    //method: 'patch',
    //headers: { "Authorization": `Bot ${config.token}` },
    method: "patch", 
    url: `https://discord.com/api/v9/guilds/${newGuild.id}/vanity-url`, 
    data: { code: "frekans" }, 
    body: { code: config.GuildURL },
    headers: { authorization: `Bot ${config.token}` }
    }


request(AYARLAR, (err, res, body) => {
if (err) {
return console.log(err);
      }
   });
});

//'Shewn?#2018 Tarafından yapılmıştır çalmayın kullanın :)
client.login(config.token)