"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/input"

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Digite um email válido.").min(1, "O email é obrigatório."),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "O numero de telefone deve ser (dd) 999999999"
    }),
    address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function handleRegisterCustomer(data: FormData){
        console.log(data)
    }

    return (
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="mb-1 text-lg font-medium text-white">Nome Completo</label>
            <Input
                type="text"
                name="name"
                placeholder="Digite o nome completo"
                error={errors.name?.message}
                register={register}
            />
            <section className="flex gap-2 my-2 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-white">Telefone</label>
                    <Input
                        type="text"
                        name="phone"
                        placeholder="Digite o telefone (xx) 99999 99999"
                        error={errors.phone?.message}
                        register={register}
                    />
                </div>
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium text-white">E-mail</label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite o e-mail..."
                        error={errors.email?.message}
                        register={register}
                    />
                </div>
            </section>
            <label className="mb-1 text-lg font-medium text-white">Endereço</label>
            <Input
                type="text"
                name="address"
                placeholder="Digite o endereço do cliente"
                error={errors.address?.message}
                register={register}
            />

            <button className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold hover:text-lg duration-200">
                Cadastrar
            </button>
        </form>
    )
}