const { EmbedBuilder, WebhookClient, GuildMember } = require("discord.js");

require("dotenv").config();
module.exports = {
  name: "guildMemberAdd",

  /**
   * @param {GuildMember} member
   *
   */
  execute(member) {
    const { user, guild } = member;
    const webhookClient = new WebhookClient({
      id: process.env.webhookId,
      token: process.env.webhookToken,
    });

    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.tag,
        iconURL: user.avatarURL({ dynamic: true, size: 512 }),
      })
      .setDescription(`Welcome ${member} tp the ${guild.name}**! `)
      .setTitle("Some Title")
      .setColor(0x00ffff);
    webhookClient.send({
      embeds: [embed],
    });
  },
};
