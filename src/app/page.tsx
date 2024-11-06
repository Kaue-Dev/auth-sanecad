"use client";

import Link from "next/link";
import { getAccounts } from "./auth/api/getAccounts";
import { deleteAccount } from "./auth/api/deleteAccount";
import { useEffect, useState } from "react";
import { useAuth } from "./auth/context/AuthContext";
import { updateAccountData } from "./auth/api/updateAccountData";

interface IAccount {
  id: number;
  cpf: string;
  name: string;
  email: string;
}

export default function Home() {
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const { isAuthenticated, userId, logout } = useAuth();

  useEffect(() => {
    getAccounts("http://localhost:8080/api/users").then((data) => {
      setAccounts(data);
    });
  }, [accounts]);

  function handleDeleteAccount() {
    const userId = Number(prompt("Digite o ID da conta que deseja deletar"));
    deleteAccount(`http://localhost:8080/api/users/${userId}`);
    setAccounts(accounts.filter((account) => account.id !== userId));
    //logout();
  }

  function handleUpdateAccountData() {
    const userId = Number(prompt("Digite o ID da conta que deseja alterar"));
    updateAccountData("http://localhost:8080/api/users", {
      id: userId,
      name: "Nome Alterado",
      cpf: "12345678901",
      email: "teste@alterando.com",
      password: "alterando123",
    });
    //logout();
  }

  return (
    <div className="flex flex-col justify-center gap-4 items-center min-h-screen">
      <h1>Home</h1>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/auth/signup"
            className="bg-green-500 px-4 py-2 text-white font-bold rounded-md"
          >
            Criar
          </Link>
          <Link
            href="/auth/login"
            className="bg-blue-500 px-4 py-2 text-white font-bold rounded-md"
          >
            Entrar
          </Link>

          <button
            className="bg-red-500 px-4 py-2 text-white font-bold rounded-md"
            onClick={handleDeleteAccount}
          >
            Deletar
          </button>
          <button
            className="bg-yellow-500 px-4 py-2 text-white font-bold rounded-md"
            onClick={handleUpdateAccountData}
          >
            Alterar
          </button>
        </div>
        {isAuthenticated && (
          <button
            className="bg-orange-500 px-4 py-2 text-white font-bold rounded-md"
            onClick={logout}
          >
            Sair
          </button>
        )}
        <div>
          <p>Logado: {isAuthenticated ? "Sim" : "Não"}</p>
          <p>ID da Conta: {userId}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-center mb-4">
            Listagem de Contas
          </h2>
          <div>
            {accounts.length === 0 && <p>Nenhuma conta encontrada.</p>}
            {accounts.map((account) => (
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
    </div>
  );
}
