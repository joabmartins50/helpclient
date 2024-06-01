
export function CardCustomer() {
    return (
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-200">
            <h2>
                <a className="font-bold">Mercado Silva</a>
            </h2>
            <p><a className="font-bold">E-mail</a> teste@teste.com.br</p>
            <p><a className="font-bold">Telefone:</a> (xx) xxxxx xxxx</p>
            <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">Deletar</button>
        </article>
    )
}