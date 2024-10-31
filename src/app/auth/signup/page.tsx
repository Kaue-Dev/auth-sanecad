import dynamic from "next/dynamic";
import Link from "next/link";

const SignupForm = dynamic(() => import("../components/SignUpForm"), { ssr: false, });

export default function Signup() {
  return (
    <div className="flex flex-col justify-center min-h-screen max-w-[600px] mx-auto max-[650px]:max-w-[90%]">
      <div className="flex flex-col mb-8">
        <h1>Registrar</h1>
        <p>Preencha suas informações para criar sua conta</p>
      </div>

      <SignupForm />

      <div className="flex items-center justify-center gap-1 mt-4 mb-2 max-[650px]:flex-col">
        <p className="text-zinc-400 text-sm">
          Ao criar sua conta você concorda com nossos
        </p>
        <Link className="text-sky-600 text-sm underline" href="#">
          Termos e Condições
        </Link>
      </div>

      <div className="flex items-center justify-center gap-1">
        <p className="text-zinc-400 text-sm">Já possui uma conta?</p>
        <Link className="text-sky-600 text-sm underline" href="/auth/login">
          Entrar
        </Link>
      </div>
    </div>
  );
}
