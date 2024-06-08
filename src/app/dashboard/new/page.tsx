import { Container } from "@/components/container";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export default async function NewTicket() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    async function handleRegisterTicket(formData: FormData){
        "use server"

        const name = formData.get("name")
        const description = formData.get("description")
        const customerId = formData.get("customer")

        if(!name || !description || !customerId){
            return;
        }

        await prismaClient.ticket.create({
            data:{
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: "ABERTO",
                userId: session?.user.id
            }
        })

        redirect("/dashboard")
    }

    return (
        <Container>
            <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/customer" className="bg-gray-600 px-4 py-1 text-white rounded">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Novo chamado</h1>
                </div>

                <form className="flex flex-col mt-6" action={handleRegisterTicket}>
                    <label className="mb-1 font-medium text-lg text-white">Nome do chamado</label>
                    <input
                        className="w-full border-2 rounded-md px-2 mb-2 h-11"
                        type="text"
                        placeholder="Digite o nome do chamado"
                        required
                        name="name"
                    />

                    <label className="mb-1 font-medium text-lg text-white">Descreva o problema</label>
                    <textarea
                        className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
                        placeholder="Descreva o problema..."
                        required
                        name="description"
                    ></textarea>

                    {customers.length !== 0 && (
                        <>
                            <label className="mb-1 font-medium text-lg text-white">Selecione o cliente</label>
                            <select
                                className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white"
                                name="customer"
                            >
                                {customers.map(customer => (
                                    <option
                                        key={customer.id}
                                        value={customer.id}
                                    >
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    {customers.length === 0 && (
                        <Link href="/dashboard/customer/new">
                            <span className="text-white font-medium">Você ainda não tem cliente? </span><span className="text-blue-500 font-medium">Cadastrar cliente.</span>
                        </Link>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold hover:text-lg duration-200 disabled:bg-gray-400  disabled:cursor-not-allowed"
                        disabled={customers.length === 0}>
                        Salvar
                    </button>
                </form>

            </main>
        </Container>
    )
}