"use client";

import Link from "next/link";
import { Label } from "../components/Label";
import { TextInput } from "../components/TextInput";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex flex-col justify-center gap-8 min-h-screen max-w-[600px] mx-auto">
      <div className="flex flex-col">
        <h1>Entrar</h1>
        <p>Insira seus dados para acessar sua conta</p>
      </div>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <TextInput
            type="email"
            id="email"
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
            required
          />
        </div>

        <div className="flex flex-col gap-1 w-full relative">
          <Label htmlFor="senha">Senha</Label>
          <TextInput
            type={showPassword ? "text" : "password"}
            id="senha"
            onChange={(ev) => setPassword(ev.target.value)}
            value={password}
            required
          />
          <button
            type="button"
            className="absolute bottom-[38px] right-4"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <Eye className="text-zinc-400" size={20} />
            ) : (
              <EyeOff className="text-zinc-400" size={20} />
            )}
          </button>
          <Link href="#" className="text-sky-600 underline">
            Esqueceu sua senha?
          </Link>
        </div>

        <button
          className="bg-sky-400 border border-sky-500 text-zinc-50 font-bold h-[50px] w-full hover:bg-sky-500"
          type="submit"
        >
          Entrar
        </button>

        <div className="flex items-center justify-center gap-1 mt-2">
          <p className="text-zinc-400">Ainda não possui uma conta?</p>
          <Link className="text-sky-600 underline" href="/auth/signup">
            Registrar-se
          </Link>
        </div>
      </form>
    </div>
  );
}
