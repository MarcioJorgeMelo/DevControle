import { authOptions } from "@/lib/auth";
import { Container } from "../../components/container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TicketItem } from "./components/ticket";
import prismaClient from "@/lib/prisma";


export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        redirect("/");
    }

    const orders = await prismaClient.ticket.findMany({
        where: {
            userId: session.user.id,
            status: "ABERTO"
        },
        include: {
            customer: true
        }
    })

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white" >
                        Abrir chamado
                    </Link>
                </div>

                <table className="min-w-full my-2">
                    <thead>
                        <tr>
                            <th className="font-medium text-left pl-1">Cliente</th>
                            <th className="font-medium text-left hidden sm:block">Cadastro</th>
                            <th className="font-medium text-left">Status</th>
                            <th className="font-medium text-left">Ações</th>
                        </tr>
                    </thead>

                    {orders.length !== 0 && (
                        <tbody>
                            {orders.map( order => (
                                <TicketItem
                                    key={order.id} 
                                    customer={order.customer}
                                    order={order} 
                                />
                            ))}
                        </tbody>
                    )}

                    {orders.length === 0 && (
                        <h1 className="px-2 md:px-0 text-gray-600">Você não possui chamados em abertos</h1>
                    )}
                </table>
            </main>
        </Container>
    )
}