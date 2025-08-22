import { usuarioService } from "../services/usuarioService.js";

export const usuarioController = {
    async create(req, res) {
        try {
            const { telegramId, nome, telefone } = req.body;
            const usuario = await usuarioService.createUser({ telegramId, nome, telefone });
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
    },

    async listAccounts(req, res) {
        try {
            const telegramId = parseInt(req.params.telegramId);
            const contas = await usuarioService.listAccounts({ telegramId });
            return res.status(200).json(contas);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async addParticipant(req, res) {
        const { contaId } = req.params;
        const { telegramIdCriador, telegramIdConvidado } = req.body;
        const telegramIdCriadorInt = parseInt(telegramIdCriador);
        const telegramIdConvidadoInt = parseInt(telegramIdConvidado);
        try {
            await usuarioService.addParticipant({ contaId, telegramIdCriador: telegramIdCriadorInt, telegramIdConvidado: telegramIdConvidadoInt });
            res.status(201).json({ sucesso: true });
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }
};