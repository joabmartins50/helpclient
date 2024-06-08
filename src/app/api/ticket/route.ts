import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { error } from "console";

export async function PATCH(request: Request){
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        return NextResponse.json({ error: "Not Authorized" }, { status: 401 })
    }

    const { id } = await request.json();

    const findTicket = await prismaClient.ticket.findFirst({
        where:{
            id: id as string
        }
    })

    if(!findTicket){
        return NextResponse.json({ error: "Filed update ticket"}, { status: 400})
    }

    try {
        await prismaClient.ticket.update({
            where:{
                id: id as string
            },
            data:{
                status: "FECHADO"
            }
        })
        return NextResponse.json({ message: "Atualizado!"})
    } catch (error) {
        return NextResponse.json({ error: "Filed update ticket"}, { status: 400})
    }
}