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
    },

    async addParticipant({ contaId, telegramIdCriador, telegramIdConvidado }) {
        const criador = await usuarioRepository.searchByTelegramId(telegramIdCriador);
        if (!criador) {
            throw new Error('Criador não encontrado');
        }

        const conta = await usuarioRepository.searchAccountById(contaId);
        if (!conta || conta.criador_id !== criador.id) {
            throw new Error('Conta inválida ou não pertence ao criador');
        }

        if (isNaN(telegramIdConvidado) || isNaN(telegramIdConvidado)) {
            throw new Error('IDs do telegram precisam ser números.');   
        }

        let convidado = await usuarioRepository.searchByTelegramId(telegramIdConvidado);
        if (!convidado) {
            throw new Error('Usuário convidado não possui conta no sistema.');
        }
        const jaParticipa = await usuarioRepository.searchParticipant({ contaId, usuarioId: convidado.id });
        if (!jaParticipa) {
            throw new Error('Usuário já é participante.');
        }

        await usuarioRepository.createParticipant({
            conta_id: contaId,
            usuario_id: convidado.id,
            valor_divido: 0,
            status: 'PENDENTE',
        });
    }

};