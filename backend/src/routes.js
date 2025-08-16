import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Testando rota!')
})


export default router;