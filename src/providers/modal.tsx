"use client"
import { createContext, ReactNode, useState } from "react";
import { OrderProps } from "@/utils/order.type";
import { CustomerProps } from "@/utils/customer.type";
import { ModalOrder } from "@/components/modal";

interface ModalContextData {
    visible: boolean;
    handleModalVisible: () => void;
    order: OrderInfo | undefined;
    setDetailOrder: (detail: OrderInfo) => void;
}

interface OrderInfo {
    order: OrderProps;
    customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [order, setOrder] = useState<OrderInfo>();

    function handleModalVisible() {
        setVisible(!visible);
    }

    function setDetailOrder(detail: OrderInfo) {
        setOrder(detail);
    }

    return (
        <ModalContext.Provider value={{ visible, handleModalVisible, order, setDetailOrder }}>
            {visible && <ModalOrder />}
            {children}
        </ModalContext.Provider>
    )
}