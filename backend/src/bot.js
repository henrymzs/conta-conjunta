import { Telegraf } from 'telegraf';
import axios from 'axios';
import 'dotenv/config'

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', (ctx) => {
  ctx.reply(
    `Comandos disponíveis:
/start - Lista todos os comandos
/criar_conta - Crie sua conta para que você comece a salvar suas contas
/salvar_conta - Mande informações da sua conta para que possamos salvar(ex: Conta de Luz)
`
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

const state = {};
bot.command('salvar_conta', (ctx) => {
  const telegramId = ctx.from.id;

  state[telegramId] = { step: 1, data: {} };

  ctx.reply('Qual o nome da conta?');
});

bot.on('text', async (ctx) => {
  const telegramId = ctx.from.id;
  if (!state[telegramId]) return;
  const userStep = state[telegramId].step;
  const userData = state[telegramId].data;

  if (userStep === 1) {
    userData.nomeConta = ctx.message.text;
    state[telegramId].step = 2;
    ctx.reply('Qual a data de vencimento? (DD/MM/AAAA)');
  } 
  
  else if (userStep === 2) {
    userData.vencimento = ctx.message.text;
    state[telegramId].step = 3;
    ctx.reply('Qual o valor da conta?');
  } 
  
  else if (userStep === 3) {
    userData.valor = ctx.message.text;
    state[telegramId].step = 4;
    ctx.reply('Informe a chave Pix (ou digite "pular")');
  } 
  
  else if (userStep === 4) {
    userData.chavePix = ctx.message.text.toLowerCase() === 'pular' ? null : ctx.message.text;

    try {
      await axios.post(`${process.env.API_URL}/contas`, {
        telegramId: telegramId,
        nome: userData.nomeConta,
        dataDeVencimento: userData.vencimento,
        valorTotal: userData.valor,
        chavePix: userData.chavePix,  
      });

      ctx.reply(`Conta "${userData.nomeConta}" salva com sucesso!`);
    } catch (error) {
      console.error('Erro ao salvar conta: ', error.response?.data || error.message);
      ctx.reply('Ocorreu um erro ao salvar a conta, tente novamente.');
    }
    delete state[telegramId];
  }
});

bot.launch().then(() => {
  console.log('Bot iniciado com sucesso!');
}).catch(err => {
  console.error('Erro ao iniciar o bot:', err.message);
});
