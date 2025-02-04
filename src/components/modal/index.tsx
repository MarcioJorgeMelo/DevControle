"use client"
import { useContext, useRef, MouseEvent } from "react";
import { ModalContext } from "@/providers/modal";


export function ModalOrder() {
    const { handleModalVisible, order } = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        if(modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleModalVisible();
        }
    }

    return (
        <div
            className="absolute bg-gray-900/80 w-full min-h-screen"
            onClick={handleModalClick}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
                    ref={modalRef}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="font-bold text-lg md:text-2xl">Detalhes do chamado</h1>

                        <button
                            className="bg-red-500 p-1 text-white rounded px-2"
                            onClick={handleModalVisible}    
                        >
                            Fechar
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Nome:</h2>
                        <p>{order?.order.name} </p>
                    </div>

                    <div className="flex flex-col flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Descrição:</h2>
                        <p>{order?.order.description}</p>
                    </div>

                    <div className="w-full border-b-[1.5px] my-4"/>

                    <h1 className="font-bold text-lg mb-4">Detalhes do cliente</h1>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Nome:</h2>
                        <p>{order?.customer?.name}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Telefone:</h2>
                        <p>{order?.customer?.phone}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Email:</h2>
                        <p>{order?.customer?.email}</p>
                    </div>

                    {order?.customer?.address && (
                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Endereço:</h2>
                            <p>{order?.customer?.address}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}