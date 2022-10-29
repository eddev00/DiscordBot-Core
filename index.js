const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

require("dotenv").config();
const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./Handlers/eventHandler");
const { connect } = require("mongoose");

connect(process.env.DatabaseURL, {}).then(() =>
  console.log("The client is now connected to the database")
);

client.events = new Collection();
client.commands = new Collection();
loadEvents(client);
//Login Bot
client.login(process.env.TOKEN);
