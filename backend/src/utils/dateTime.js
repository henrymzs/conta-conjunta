export function parseDateUser(dataSrt) {
    // Data esperada (dia/mes/ano);
    const [dia, mes, ano] = dataSrt.split('/').map(Number);
    if (!dia || !mes || !ano) {
        throw new Error('Data inválida. Use o formato Dia/Mês/Ano');
    }
    return new Date(ano, mes-1, dia);
}

export function validateFutureDate(data) {
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    if (data < hoje) {
        throw new Error('A data de vencimento não pode ser no passada.');
    } 
}