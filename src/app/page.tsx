"use client";

import Link from "next/link";
import { getAccounts } from "./utils/getAccounts";
import { deleteAccount } from "./utils/deleteAccount";
import { useEffect, useState } from "react";

interface IAccount {
  id: number,
  cpf: string,
  name: string,
  email: string,
}

export default function Home() {

  const [accounts, setAccounts] = useState<IAccount[]>([]);

  useEffect(() => {
    getAccounts("http://localhost:8080/api/users").then(data => { setAccounts(data) })
  }, []);

  function handleDeleteAccount() {
    const id = prompt("Digite o ID da conta que deseja deletar");
    if (!id) return;

    deleteAccount(`http://localhost:8080/api/user/${id}`);
    setAccounts(accounts.filter(account => account.id !== Number(id)));
  }

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
        <button className="bg-red-500 px-4 py-2 text-white font-bold rounded-md" onClick={handleDeleteAccount}>
          Deletar
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold text-center mb-4">Listagem de Contas</h2>
        <div>
          {accounts.map(account => (
            <div key={account.id} className="border p-2 mb-2">
              <p>ID: {account.id}</p>
              <p>CPF: {account.cpf}</p>
              <p>Nome: {account.name}</p>
              <p>E-mail: {account.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
