const { Client } = require("discord.js");
require("dotenv").config();
const client = new Client({
  intents: ["Guilds"],
});

client
  .login(process.env.TOKEN)
  .then(() => {
    console.log(`client logged in as ${client.user.username}`);

    client.user.setActivity(`with ${client.guilds.cache.size} guilds`);
  })
  .catch(
    console.log((err) => {
      console.log(err);
    })
  );
