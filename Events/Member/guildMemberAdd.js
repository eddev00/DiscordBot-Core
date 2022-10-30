const {
  EmbedBuilder,
  WebhookClient,
  GuildMember,
  Embed,
} = require("discord.js");

const welcomeSchema = require("../../Models/Welcome");
require("dotenv").config();
module.exports = {
  name: "guildMemberAdd",

  /**
   * @param {GuildMember} member
   *
   */
  async execute(member) {
    welcomeSchema.findOne(
      {
        Guid: member.guild.id,
      },
      async (err, data) => {
        if (!data) return;

        let channel = data.Channel;

        let Msg = data.Msg || "";
        let Role = data.Role;
        const { user, guild } = member;
        const welcomeChannel = member.guild.channels.cache.get(channel);
        let webhooks = await welcomeChannel.fetchWebhooks();
        const myWebHook = webhooks.find((wh) => wh.name === "Welcome"); //FIND WELCOME WEBHOOK

        const welcomeEmber = new EmbedBuilder()
          .setTitle("**New member!**")
          .setDescription(Msg)
          .setColor(0x037821)
          .addFields({ name: "Total members", value: `${guild.memberCount}` });

        myWebHook.send({
          //SEND WELCOME MESSAGE USING THE WEBHOOK
          embeds: [welcomeEmber],
        });
        member.roles.add(Role);
      }
    );
  },
};
