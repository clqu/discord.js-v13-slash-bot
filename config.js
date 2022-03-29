const { Intents } = Discord;

module.exports = {
    client: {
        token: "",
        status: "Developed with ❤️ by clqu",
        intents: [
            Intents.FLAGS.GUILDS
        ],
    },
    commandsDir: './src/commands',
    prefix: '(!): '
}
