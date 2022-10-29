const {
  WebhookClient,
  ChatInputCommandInteraction,
  SlashCommandBuilder,

  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("action")
    .setDescription("Moderation commands")

    .addUserOption((option) =>
      option.setName("target").setDescription("your target").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("action_nature")
        .setDescription("set action")
        .setRequired(true)
        .addChoices(
          { name: "Ban", value: "ban" },
          { name: "Kick", value: "kick" },
          { name: "TimeOut", value: "timeout" }
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("the reason of the action")
    ),
  async execute(interaction, client) {
    const webhookClient = new WebhookClient({
      id: "1035922413470359672",
      token:
        "6wuAUAH2d3ka-umTlrF35PNOhs7VM1VapRRIagVxe2Nxiwtf_Ym1cvVcfgKMWLfhvqjh",
    });

    const user = interaction.options.getUser("target");
    const reason =
      interaction.options.getString("reason") || "No reason provided";
    const action = interaction.options.getString("action_nature");
    console.log(action);
    const Target = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);
    switch (action) {
      case "kick":
        if (!interaction.member.permissions.has("KickMembers"))
          return await interaction.reply({
            content: "you don't have the permission",
            ephemeral: true,
          });
        await Target.kick(reason)
          .then(interaction.reply("Action executed succesfully"))
          .catch((err) => {
            interaction.reply(`Action failed code: ${err}`);
            console.error;
          });
        webhookClient.send({
          content: `${Target} has been Kicked. ${reason}`,
        });
        break;
      case "ban":
        if (!interaction.member.permissions.has("BanMembers"))
          return await interaction.reply({
            content: "you don't have the permission",
            ephemeral: true,
          });
        await Target.ban({
          deleteMessageSeconds: 60 * 60 * 24 * 7,
          reason: `${reason}`,
        })
          .then(interaction.reply("Action executed succesfully"))
          .catch((err) => {
            interaction.reply(`Action failed code: ${err}`);
            console.error;
          });
        webhookClient.send({
          content: `${Target} has been Banned. ${reason}`,
        });
        break;
      case "timeout":
        await Target.timeout(reason)
          .then(interaction.reply("Action executed succesfully"))
          .catch((err) => {
            interaction.reply(`Action failed code: ${err}`);
            console.error;
          });
        webhookClient.send({
          content: `${Target} has been Banned. ${reason}`,
        });
        break;
    }
  },
};
