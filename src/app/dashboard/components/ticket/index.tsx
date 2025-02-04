"use client"
import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { OrderProps } from "@/utils/order.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface OrderItemProps {
    order: OrderProps;
    customer: CustomerProps | null;
}

export function TicketItem({ customer, order }: OrderItemProps) {
    const router = useRouter();

    async function handleChangeStatus() {
        try {
            
            const response = await api.patch("/api/order", {
                id: order.id,
            })

            router.refresh();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
                <td className="text-left pl-1">
                    {customer?.name}
                </td>
                <td className="text-left hidden sm:table-cell">
                    {order.created_at?.toLocaleDateString("pt-br")}
                </td>
                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded">{order.status}</span>
                </td>
                <td className="text-left">
                    <button className="mr-3" onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color="#131313" />
                    </button>
                    <button>
                        <FiFile size={24} color="#3b82f6" />
                    </button>
                </td>
            </tr>
        </>
    )
}