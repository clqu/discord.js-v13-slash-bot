module.exports = {
    name: "example",
    description: "Command",
    permissions: ["MANAGE_GUILD"],
    options: [
        { type: 6, name: 'user', description: 'Mention user.', required: false },
        { type: 7, name: 'channel', description: 'Mention channel.', required: false }
        /* 
            If you search more option types?
            Check it; https://github.com/clqu/discord.js-v13-slash-bot#for-developers
        */
    ],
    run: async (client, interaction) => {
        const _user = interaction?.options?.get("user")?.user;
        const _channel = interaction?.options?.get("user")?.channel;
        /* 
            interaction.options.get("optionName") 
        */

        /* 
           And I recommend using interaction.reply
           Because otherwise you will have to write a text to indicate who the message belongs to, 
           interaction.reply in slash commands will be best for you.
       */
        if (channel) {
            await interaction.reply({ content: `${client.user.username} | ${channel.id}`, ephemeral: true })
        }
        if (user) {
            await interaction.followUp({ content: `${client.user.username} | ${user.username}`, ephemeral: true })
        }
        /*
            Why using followUp?
            > Because we can reply once in slash commands, but if we want 
            > to write more than one, we can provide multiple replies using followUp. 
            > But it is not a method that I highly recommend.
        */
    },
};