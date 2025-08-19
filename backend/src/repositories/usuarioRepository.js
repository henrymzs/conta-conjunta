import prisma from "../database/prisma.js";

export const usuarioRepository = {
    async createUser({ telegramId, nome, username }) {
        return await prisma.usuario.create({
            data: { telegramId, nome, username },
        });
    },

    async searchByTelegramId(telegramId) {
        return await prisma.usuario.findUnique({
            where: { telegramId },
        });
    }
};