import { Telegraf } from 'telegraf';
import axios from 'axios';
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('text', async (ctx) => {
  const mensagem = ctx.message.text;
  const telefone = ctx.message.from.username || ctx.message.from.id;

  try {
    await axios.post(`${process.env.API_URL}/mensagem`, {
      telefone,
      mensagem
    });
    ctx.reply('Mensagem recebida!');
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error.message);
    ctx.reply('Erro ao enviar mensagem');
  }
});

bot.launch().then(() => {
  console.log("Bot iniciado com sucesso!");
  bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, 'ola');
}).catch(err => {
  console.error("Erro ao iniciar o bot:", err.message);
});
