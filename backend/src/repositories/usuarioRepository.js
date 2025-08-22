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

    async listAccounts(usuarioId) {
        return await prisma.conta.findMany({
            where: { criador_id: usuarioId },
        });
    },

    async searchAccountById(contaId){
        return await prisma.conta.findUnique({
            where: { id: contaId }
        });
    },

    async searchParticipant({ contaId, usuarioId }) {
        return await prisma.participante.findFirst({
            where: {
                conta_id: contaId,
                usuario_id: usuarioId,
            }
        });
    },

    async create(data) {
        return await prisma.participante.create({ data });
    },
};