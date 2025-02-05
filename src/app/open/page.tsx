"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { FormOrder } from "./components/formOrder";
import { api } from "@/lib/api";

const schema = z.object({
    email: z.string().email("Digite o email do cliente para localizar.").min(1, "O campo email é obrigatório.")
})

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
    id: string;
    name: string;
}


export default function OpenOrder() {
    const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

    const { register, handleSubmit, setError, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    function handleClearCustomer() {
        setCustomer(null);
        setValue("email", "");
    }

    async function handleSearchCustomer(data: FormData) {
        const response = await api.get("/api/open", {
            params: {
                email: data.email
            }
        })

        if(response.data === null) {
            setError("email", { type: "custom", message: "Ops, cliente não foi encontrado." });
            return;
        }

        setCustomer({
            id: response.data.id,
            name: response.data.name
        });
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

            <main className="flex flex-col mt-4 mb-2">
                {customer? (
                    <div className="bg-slate-200 py-6 px-4 rounded border-2 flex items-center justify-between">
                        <p className="text-lg"><strong>Cliente selecionado:</strong> {customer.name}</p>

                        <button
                            className="h-11 px-2 flex items-center justify-center rounded"
                            onClick={handleClearCustomer}
                        >
                            <FiX size={32} color="#ff2929" />
                        </button>
                    </div>
                ): (
                    <form 
                        className="bg-slate-200 py-6 px-2 rounded border-2" 
                        onSubmit={handleSubmit(handleSearchCustomer)}
                    >
                        <div className="flex flex-col gap-3">
                            <Input
                                name="email"
                                placeholder="Digite o email do cliente..."
                                type="email"
                                error={errors.email?.message}
                                register={register}
                            />

                            <button
                                type="submit"
                                className="bg-blue-500 flex flex-row gap-4 px-2 h-11 items-center justify-center text-white font-bold rounded"
                            >
                                Procurar cliente
                                <BiSearch size={24} color="#FFF" />
                            </button>
                        </div>
                    </form>
                )}

                {customer !== null && <FormOrder />}
            </main>
        </div>
    )
}