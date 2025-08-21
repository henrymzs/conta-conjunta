import express from 'express';
import { usuarioController } from './controllers/usuarioController.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Testando rota!')
})

router.post('/mensagem', (req, res) => {
  const { telefone, mensagem } = req.body;
  console.log('Nova mensagem recebida');
  console.log('Telefone/usuario', telefone);
  console.log('mensagem', mensagem);

  res.status(200).json({ message: 'mensagem salva com sucesso' })
})

router.post('/usuarios', usuarioController.create);
router.post('/contas', usuarioController.createCount);
router.get('/contas/:telegramId', usuarioController.listAccounts);

export default router;