import { Container } from '@/components/container'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CardCustomer } from './components/card'

export default async function Customer() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/")
  }

  return (
    <Container>
      <main className='mt-9 mb-2'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-white mb-2'>Meus Clientes</h1>
          <Link href="/dashboard/customer/new" className='bg-blue-500 px-4 py-1 rounded text-white'>
            Novo
          </Link>
        </div>

        <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2'>
          <CardCustomer/>
          <CardCustomer/>
          <CardCustomer/>
        </section>
        
      </main>
    </Container>
  )
}