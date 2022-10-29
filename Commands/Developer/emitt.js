const {
  ChatInputCommandInteraction,
  Client,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("emitt")
    .setDescription("Event emitter .")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    .addStringOption((option) =>
      option
        .setName("member")
        .setDescription("Guild Member Events.")
        .setRequired(true)
        .addChoices(
          { name: "guildMemberAdd", value: "guildMemberAdd" },
          { name: "guildMemberRemove", value: "guildMemberRemove" }
        )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    console.log("passed");
    const choices = interaction.options.getString("member");
    switch (choices) {
      case "guildMemberAdd":
        {
          client.emit("guildMemberAdd", interaction.member);

          interaction.reply({
            content: "Emitted the event",
            ephemeral: true,
          });
        }
        break;
      case "guildMemberRemove":
        {
          client.emit("guildMemberRemove", interaction.member);
          interaction.reply({
            content: "Emitted the event",
            ephemeral: true,
          });
        }
        break;
    }
  },
};
