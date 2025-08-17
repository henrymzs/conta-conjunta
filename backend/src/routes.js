import express from 'express';
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


export default router;