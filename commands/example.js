module.exports = {
    name: "example",
    description: "qwe",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        // If you want to know which option the type number is equal to, check the github page.
        // https://github.com/iClaudette/discord.js-v13-slash-bot#for-developers
        { type: 1, name: 'user', description: 'Mention user.' },
        { type: 3, name: 'channel', description: 'Mention channel.' }
    ],
    run: async (client, interaction) => {
        /* 
            And I recommend using interaction.reply
            Because otherwise you will have to write a text to indicate who the message belongs to, 
            interaction.reply in slash commands will be best for you.
        */
        const channel = interaction.options.getChannel('channel');
        const user = interaction.options.getUser('user');
        /*
            interaction.options.get<optionType>('<optionName>');
        */
        if(channel) {
            await interaction.reply({ content: `${client.user.username} | ${channel.id}`, ephemeral: true  })
        }
        if(user) {
            await interaction.followUp({ content: `${client.user.username} | ${user.username}`, ephemeral: true  })
        }
        /*
            Why using followUp?
            > Because we can reply once in slash commands, but if we want 
            > to write more than one, we can provide multiple replies using followUp. 
            > But it is not a method that I highly recommend.
        */
    }
}