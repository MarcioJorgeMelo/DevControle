import { NextResponse } from "next/server"; 
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/auth"; 
import prismaClient from "@/lib/prisma"; 


export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { id } = await request.json();

    const findOrder = await prismaClient.ticket.findFirst({
        where: {
            id: id as string
        }
    })

    if(!findOrder) {
        return NextResponse.json({ error: "Failed update order" }, { status: 400 });
    }

    try {
        
        await prismaClient.ticket.update({
            where: {
                id: id as string
            },
            data: {
                status: "FECHADO"
            }
        })

        return NextResponse.json({ error: "Chamado atualizado com sucesso!" });

    } catch (error) {
        return NextResponse.json({ error: "Failed update order" }, { status: 400 });
    }
}