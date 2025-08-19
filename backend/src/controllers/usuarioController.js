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
};