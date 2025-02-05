import { NextResponse } from "next/server"; 
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/auth"; 
import prismaClient from "@/lib/prisma"; 


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const customerEmail = searchParams.get("email");

    if(!customerEmail || customerEmail === "") {
        return NextResponse.json({ error: "Customer not found." }, { status: 400 });
    }

    try {

        const customer = await prismaClient.customer.findFirst({
            where: {
                email: customerEmail
            }
        })

        return NextResponse.json(customer);
        
    } catch (error) {
        return NextResponse.json({ error: "Customer not found." }, { status: 400 });
    }

    return Response.json({ message: "Recebido" })
}