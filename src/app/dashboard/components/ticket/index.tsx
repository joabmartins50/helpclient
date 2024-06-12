"use client"

import { useContext } from 'react';
import { FiCheckSquare, FiFile } from 'react-icons/fi'
import { ticketsProps } from '@/utils/ticket.type'
import { CustomerProps } from '@/utils/customer.type';
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

import { ModalContext, ModalProvider } from '@/providers/modal';

interface TicketItemProps {
  ticket: ticketsProps;
  customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  const router = useRouter();
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext)

  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      })

      router.refresh();

    } catch (err) {
      console.log(err);
    }
  }

  function handleOpenModal(){
    handleModalVisible();
    setDetailTicket({
      customer: customer,
      ticket: ticket
    })
  }

    return(
        <>
            <tr className='border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-200 hover:bg-gray-600 duration-300 hover:text-white'>
                <td className="text-left pl-2">
                    {customer?.name}
                </td>
                <td className="text-left hidden sm:table-cell">
                {ticket.created_at?.toLocaleDateString("pt-br")}
                </td>
                <td className="text-left">
                    <span className="bg-green-500 px-2 rounded">{ticket.status}</span>
                </td>
                <td className="text-left">
                    <button className="mr-3" onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color="#3f3f3f"/>
                    </button>
                    <button onClick={handleOpenModal}>
                        <FiFile size={24} color="#3b82f6"/>
                    </button>
                </td>
            </tr>
        </>
    )
}