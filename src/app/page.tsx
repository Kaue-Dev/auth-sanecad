import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center gap-4 items-center min-h-screen">
      <h1>Login efetuado com sucesso!</h1>
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
    </div>
  )
}
