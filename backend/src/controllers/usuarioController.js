import { usuarioService } from "../services/usuarioService.js";

export const usuarioController = {
    async create(req, res) {
        try {
            const { telegramId, nome, telefone } = req.body;
            const usuario = await usuarioService.createUser({telegramId, nome, telefone});
            return res.status(201).json(usuario);
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    },

    async createCount(req, res) {
        try {
            const { nome, dataDeVencimento, valorTotal, chavePix, telegramId } = req.body;
            if (!nome || !dataDeVencimento || !valorTotal) {
                return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
            }
            const conta = await usuarioService.createCount({ nome, dataDeVencimento, valorTotal, chavePix, telegramId });
            return res.status(201).json(conta);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};