import { usuarioRepository } from "../repositories/usuarioRepository.js";

export const usuarioService = {
    async createUser({telegramId, nome, telefone}) {
        const existente = await usuarioRepository.searchByTelegramId(telegramId);
        if (existente) {
            throw new Error('Usuário já cadastrado com esse Telegram ID');
        }
        return await usuarioRepository.createUser({telegramId, nome, telefone});
    },
};