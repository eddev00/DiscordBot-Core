const { EmbedBuilder, WebhookClient, GuildMember } = require("discord.js");

require("dotenv").config();
module.exports = {
  name: "guildMemberRemove",

  /**
   * @param {GuildMember} member
   *
   */
  async execute(member) {
    const { user, guild } = member;
    const webhookClient = new WebhookClient({
      id: "1035922413470359672",
      token:
        "6wuAUAH2d3ka-umTlrF35PNOhs7VM1VapRRIagVxe2Nxiwtf_Ym1cvVcfgKMWLfhvqjh",
    });

    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.tag,
        iconURL: user.avatarURL({ dynamic: true, size: 512 }),
      })
      .setDescription(`${member} has been kicked from ${guild.name}**! `)
      .setTitle("Some Title")
      .setColor(0x00ffff);
    await webhookClient.send({
      embeds: [embed],
    });
  },
};
