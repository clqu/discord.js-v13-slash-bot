#Discord.js v13 Slash Bot<br>
#[Discord Server](https://discord.gg/Qdbq2v8FM4)

## 🛠 Setup
 - Run the `setup.bat` file.
 - Wait until the process is finished.
 - Go to [discord.dev](https://discord.dev) page.
 - Create a bot.
 - Click on `Bot` on the left side.
 - Click `Add Bot` on the right.
 - Copy the bot's token.
 - Type the bot's token in the `token` field in `config.json`.
 - Finally open the `run.bat` file.

## ✨ For Developers
| Number      |  Type          |
| :---:       |  :---:         |
| 1           |  User          | 
| 2           |  Role          | 
| 3           |  Channel       | 
| 4           |  String        | 
| 5           |  Integer       | 
| 6           |  Boolean       | 
| 7           |  Mentionable   | 


## 🔮 Example Command
```js
module.exports = {
    name: "example",
    description: "qwe",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
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
```

## ⭐ Star
 - Don't forget to star this repo for support :)