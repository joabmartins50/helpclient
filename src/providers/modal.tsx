"use client"

import { createContext, ReactNode, useState } from "react"
import { ticketsProps } from "@/utils/ticket.type"
import { CustomerProps } from "@/utils/customer.type"
import { ModalTicket } from "@/components/modal";

interface ModalContextData{
    visible: boolean;
    handleModalVisible: () => void;
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({ children }: { children: ReactNode}) => {
    const [visible, setVisible] = useState(true);

    function handleModalVisible(){
        setVisible(!visible)
    }
    return (
        <ModalContext.Provider value={{ visible, handleModalVisible }}>
            {visible && (<ModalTicket/>)}
            {children}
        </ModalContext.Provider>
    )
}

