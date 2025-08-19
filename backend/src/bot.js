import { Telegraf } from 'telegraf';
import axios from 'axios';
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('help', (ctx) => {
  ctx.reply(
    `Comandos disponíveis:
/help - Lista todos os comandos
/salvar_conta - Mande informações da sua conta para que possamos salvar(ex: Conta de Luz)
/minhas_contas - Visualizar suas contas cadastradas
/participantes - Gerenciar participantes de uma conta
/pegar_toke - Gere token de suas contas para compartilhar com outras pessoas e enviar notificações`
  );
});

bot.command('criar_conta', async (ctx) => {
  const telegramId = ctx.from.id;
  const nome = ctx.from.first_name;
  const username = ctx.from.username;
  try {
    await axios.post(`${process.env.API_URL}/usuarios`, {
      telegramId,
      nome,
      username
    });
    ctx.reply(`Olá ${nome}! Sua conta foi criada com sucesso.`);
  } catch (error) {
    console.error('Erro ao criar usuário:', error.response?.data || error.message);
    ctx.reply('Ocorreu um erro ao criar sua conta tente novamente.');
  }
});

bot.on('text', async (ctx) => {
  ctx.reply(
    `Olá ${ctx.from.first_name}! 👋
Eu sou seu assistente de contas compartilhadas.
Você pode usar os seguintes comandos:

/help - Lista todos os comandos
/salvar_conta - Mande informações da sua conta para que possamos salvar(ex: Conta de Luz)
/minhas_contas - Visualizar suas contas cadastradas
/participantes - Gerenciar participantes de uma conta
/pegar_toke - Gere token de suas contas para compartilhar com outras pessoas e enviar notificações`
  );
});

bot.launch().then(() => {
  console.log('Bot iniciado com sucesso!');
}).catch(err => {
  console.error('Erro ao iniciar o bot:', err.message);
});
