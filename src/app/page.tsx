import Image from 'next/image'
import horoImg from '../assets/hero.svg'

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)] bg-gray-800">
      <h2 className="font-medium text-2xl mb-2 text-white">Gerencie sua empresa</h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">Atendimentos, clientes</h1>
      <Image
        src={horoImg}
        alt="Imagem hero do dev controle"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  )
}
