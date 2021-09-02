const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
const fs = require('fs');
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intetnts.FLAGS.GUILD_INTERACTIONS] });

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    const commandBuilder = new SlashCommandBuilder()
    .setName(command.name)
    .setDescription(command.description);
    command.options.map(op => {
        const { type } = op;
        if(type === 1) {
            commandBuilder.addUserOption(option => option.setName(op.name.toLowerCase()).setDescription(op.description));
        } else if(type === 2) {
            commandBuilder.addRoleOption(option => option.setName(op.name.toLowerCase()).setDescription(op.description));
        } else if(type === 3) {
            commandBuilder.addChannelOption(option => option.setName(op.name.toLowerCase()).setDescription(op.description));
        } else if(type === 4) {
            commandBuilder.addStringOption(option => option.setName(op.name.toLowerCase()).setDescription(op.description));
        } else if(type === 5) {
            commandBuilder.addIntegerOption(option => option.setName(op.name.toLowerCase()).setDescription(op.description));
        } else if(type === 6) {
            commandBuilder.addBooleanOption(option => option.setName(op.name.toLowerCase()).setDescription(op.description));
        } else if(type === 7) {
            commandBuilder.addMentionableOption(option => option.setName(op.name.toLowerCase()).setDescription(op.description));
        }
    })
	commands.push(commandBuilder)
}

const rest = new REST({ version: '9' }).setToken(config.token);

client.on("ready", async () => {
    console.log(`Logged as in ${client.user.tag}`);
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands },
            );

            console.log(`A total of ${commands.length} (/) commands were loaded.`);
        } catch (error) {
            console.error(error);
        }
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        if(interaction.commandName.toLowerCase() === command.name.toLowerCase()) {
            command.run(client, interaction)
        }
	}
});

client.login(config.token);
