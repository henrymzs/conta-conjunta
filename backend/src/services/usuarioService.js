import { usuarioRepository } from "../repositories/usuarioRepository.js";
import { formatDateUser, parseDateUser, validateFutureDate } from "../utils/dateTime.js";

export const usuarioService = {
    async createUser({ telegramId, nome, telefone }) {
        const existente = await usuarioRepository.searchByTelegramId(telegramId);
        if (existente) {
            throw new Error('Usuário já cadastrado com esse Telegram ID');
        }
        return await usuarioRepository.createUser({ telegramId, nome, telefone });
    },

    async createCount({ nome, dataDeVencimento, valorTotal, chavePix, telegramId }) {
        const usuario = await usuarioRepository.searchByTelegramId(telegramId);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }
        const dataConvertida = parseDateUser(dataDeVencimento);
        validateFutureDate(dataConvertida);
        const valorConvertido = parseFloat(valorTotal.toString().replace(',', '.'));
        if (valorConvertido <= 0) {
            throw new Error('O valor da conta deve ser maior que zero');
        }
        try {
            return await usuarioRepository.createCount({
                nome,
                dataDeVencimento: dataConvertida,
                valorTotal: valorConvertido,
                chavePix,
                criadorId: usuario.id,
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new Error('Conta já existe com esses dados.');
            }
            throw new Error('Erro ao criar a conta.');
        }
    },

    async listAccounts({ telegramId }) {
        const usuario = await usuarioRepository.searchByTelegramId(telegramId);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }
        const contas = await usuarioRepository.listAccounts(usuario.id);
        return contas.map(conta => ({
            ...conta,
            data_vencimento_formatada: formatDateUser(conta.data_vencimento)
        }));
    }

};