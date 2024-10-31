"use client";

import Link from "next/link";
import { getAccounts } from "./utils/getAccounts";

export default function Home() {

  //const [accounts, setAccounts] = useState([]);

  getAccounts("http://localhost:3000/api/users");

  return (
    <div className="flex flex-col justify-center gap-4 items-center min-h-screen">
      <h1>Home</h1>
      <div className="flex items-center gap-4">
        <Link href="/auth/signup" className="bg-green-500 px-4 py-2 text-white font-bold rounded-md">
          Criar
        </Link>
        <Link href="/auth/login" className="bg-blue-500 px-4 py-2 text-white font-bold rounded-md">
          Entrar
        </Link>
        <button className="bg-red-500 px-4 py-2 text-white font-bold rounded-md">
          Deletar
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold">Listagem de Contas</h2>
        <div>
          {}
        </div>
      </div>
    </div>
  )
}
