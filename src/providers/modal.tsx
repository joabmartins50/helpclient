"use client"

import { createContext, ReactNode, useState } from "react"
import { ticketsProps } from "@/utils/ticket.type"
import { CustomerProps } from "@/utils/customer.type"

interface ModalContextData{
    visible: boolean;
    handleModalVisible: () => void;
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({ children }: { children: ReactNode}) => {
    const [visible, setVisible] = useState(false);

    function handleModalVisible(){
        setVisible(!visible)
    }
    return (
        <ModalContext.Provider value={{  }}>
            {children}
        </ModalContext.Provider>
    )
}