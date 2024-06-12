"use client"

import { useRouter } from "next/navigation"
import { FiRefreshCw } from "react-icons/fi"

export function ButtonReflesh(){
    const router = useRouter();

    return(
        <button onClick={() => router.refresh()}
        className="bg-gray-500 px-4 py-1 rounded">
            <FiRefreshCw size={24} color="#fff"/>
        </button>
    )
}