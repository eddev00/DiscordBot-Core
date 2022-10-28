const { ChatInputCommandInteraction } = require("discord.js");
require("dotenv").config();
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "This Command is outdated",
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== `${process.env.DEVID}`)
      return interaction.reply({
        content: "This command is only available to the developer",
        ephemeral: true,
      });
    command.execute(interaction, client);
  },
};
