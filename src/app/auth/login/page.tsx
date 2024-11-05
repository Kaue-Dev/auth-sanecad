import dynamic from "next/dynamic";
import Link from "next/link";

const LoginForm = dynamic(() => import("../components/LoginForm"), { ssr: false });

export default function Login() {
  return (
    <div className="flex flex-col justify-center min-h-screen max-w-[600px] mx-auto max-[650px]:max-w-[90%]">
      <div className="flex flex-col mb-8">
        <h1>Entrar</h1>
        <p>Insira seus dados para acessar sua conta</p>
      </div>

      <LoginForm />

      <div className="flex items-center justify-center gap-1 mt-4">
        <p className="text-zinc-400 text-sm">Ainda não possui uma conta?</p>
        <Link className="text-sky-600 text-sm underline" href="/auth/signup">
          Registrar-se
        </Link>
      </div>
    </div>
  );
}
