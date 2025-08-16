import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const chaves = await prisma.usuario.create({
        data: {
            nome: 'Chaves',
            telefone: '85999999999',
        },
    });

    const kiko = await prisma.usuario.create({
        data: {
            nome: 'Kiko',
            telefone: '85988888888',
        },
    });

    const conta = await prisma.conta.create({
        data: {
            nome: 'Conta de Luz',
            valor_total: 200.00,
            data_vencimento: new Date('2025-08-20'),
            chave_pix: 'kiko@pix',
            criador: {
                connect: { id: kiko.id },
            },
            participantes: {
                create: [
                    {
                        usuario: { connect: { id: chaves.id } },
                        valor_divido: 100.00,
                    },
                    {
                        usuario: { connect: { id: kiko.id } },
                        valor_divido: 100.00,
                    },
                ],
            },
        },
    });
    console.log('Seed conluído com sucesso! ');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
