const { Client, GatewayIntentBits } = require('discord.js');
const translate = require('@vitalets/google-translate-api');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Bot está online como ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('!traduzir') || message.author.bot) return;

  const texto = message.content.replace('!traduzir', '').trim();

  if (!texto) {
    return message.reply('Por favor, digite algo para traduzir.');
  }

  try {
    const res = await translate(texto, { to: 'pt' });
    message.channel.send(`📘 Tradução: ${res.text}`);
  } catch (error) {
    console.error(error);
    message.channel.send('❌ Ocorreu um erro ao traduzir.');
  }
});

client.login(process.env.TOKEN);
