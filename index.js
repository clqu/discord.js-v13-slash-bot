const Discord = require('discord.js');
const { Client, Intents } = Discord;
const config = require("./config");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require('fs');


// =================================================================================== \\
const client = new Client({
    intents: config.client.intents,
});
// =================================================================================== \\

let commands = [];
fs.readdir(config.commandsDir, (err, files) => {
    if (err) throw err;
    files.forEach(async (f) => {
        try {
            let props = require(`${config.commandsDir}/${f}`);
            commands.push({
                name: props.name,
                description: props.description,
                options: props.options
            });
        } catch (err) {
            console.log(err);
        }
    });
});

// =================================================================================== \\

const rest = new REST({ version: "9" }).setToken(config.client.token);
client.once("ready", () => {
    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: await commands,
            });
            console.log(config.prefix + "Successfully reloaded application [/] commands.");
        } catch { };
    })();
});

// =================================================================================== \\

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    // ========[ COMMAND BUILDER ]========== \\
    fs.readdir(config.commandsDir, (err, files) => {
        if (err) throw err;
        files.forEach(async (f) => {
            let props = require(`${config.commandsDir}/${f}`);
            if (interaction.commandName.toLowerCase() === props.name.toLowerCase()) {
                try {
                    if ((props?.permissions?.length || [].length) > 0) {
                        (props?.permissions || [])?.map(perm => {
                            if (interaction.member.permissions.has(config.permissions[perm])) {
                                return props.run(client, interaction);
                            } else {
                                return interaction.reply({ content: `Missing permission: **${perm}**`, ephemeral: true });
                            }
                        })
                    } else {
                        return props.run(client, interaction);
                    }
                } catch (e) {
                    return interaction.reply({ content: `Something went wrong...\n\n\`\`\`${e.message}\`\`\``, ephemeral: true });
                }
            }
        });
    });
    // ========[ COMMAND BUILDER ]========== \\
});


// =================================================================================== \\
client.once("ready", () => {
    // ================ \\
    console.log(config.prefix + "Client successfully connected.");
    // ================ \\
    client.user.setStatus('ONLINE');
    client.user.setActivity(config.client.status);
    // ================ \\
})

// =================================================================================== \\


// =================================================================================== \\
client.login(config.client.token);
// =================================================================================== \\
