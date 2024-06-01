"use client"

import Link from 'next/link'
import { FiUser, FiLogOut, FiLoader, FiLock } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FaAlignJustify } from "react-icons/fa6";

export function Header() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-gray-950 h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300 text-white">
            <span className="text-blue-500">HELP</span>CLIENT
          </h1>
        </Link>


        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin}>
            <FiLock size={26} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-4">
            {data.user.image && (
              <img
                src={data.user.image}
                alt="User profile"
                className="w-8 h-8 rounded-full"
              />
            )}
            <Link href="/dashboard">
              <FaAlignJustify  size={26} color="#4b5563" />
            </Link>

            <button onClick={handleLogout}>
              <FiLogOut size={26} color="#4b5563" />
            </button>
          </div>
        )}


      </div>
    </header>
  )
}