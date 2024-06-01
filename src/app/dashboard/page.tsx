import { Container } from '@/components/container'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TicketItem } from './components/ticket'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/")
  }


  return (
    <Container>
      <main className='mt-9 mb-2'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-white mb-2'>Chamados</h1>
          <Link href="/dashboard/new" className='bg-blue-500 px-4 py-1 rounded text-white'>
            Novo
          </Link>
        </div>

        <table className='min-w-full my-2'>
          <thead>
            <tr className= 'bg-gray-950 text-white rounded'>
              <th className='font-medium text-left pl-1'>CLIENTE</th>
              <th className='font-medium text-left hidden sm:block'>DATA CADASTRO</th>
              <th className='font-medium text-left'>STATUS</th>
              <th className='font-medium text-left'>#</th>
            </tr>
          </thead>
          <tbody>
            <TicketItem />
            <TicketItem />
          </tbody>
        </table>

      </main>
    </Container>
  )
}