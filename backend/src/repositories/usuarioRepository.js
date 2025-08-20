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
    },

    async createCount({ nome, dataDeVencimento, valorTotal, chavePix, criadorId }) {
        return await prisma.conta.create({
            data: { 
                nome, 
                valor_total: valorTotal, 
                data_vencimento: dataDeVencimento, 
                chave_pix: chavePix,
                criador_id: criadorId,
             }
        }); 
    },
};