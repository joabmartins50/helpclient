import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewCustomerForm } from "../components/form";
import { Slide, Zoom, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default async function NewCustomer() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect("/")
    }


    return (
        <Container>
            <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/customer" className="bg-gray-600 px-4 py-1 text-white rounded">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Novo cliente</h1>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}/>
                <NewCustomerForm userId={session.user.id} />

            </main>
        </Container>
    )
}