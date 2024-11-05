"use client";

interface IFormValues {
  email: string;
  password: string;
}

import Link from "next/link";
import { Label } from "../components/Label";
import { TextInput } from "../components/TextInput";
import { FormEvent, useState } from "react";
import { PasswordInput } from "../components/PasswordInput";
import { loginUser } from "../api/userServices";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<IFormValues>({
    email: "",
    password: "",
  })

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const response = await loginUser(formData);
    if (response?.ok) router.push("/");
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <TextInput
          type="email"
          id="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
          required
        />
      </div>

      <div>
        <PasswordInput
          setPassword={(password) => setFormData({ ...formData, password })}
          password={formData.password}
          id="password"
          label="Senha"
          isInvalid={false}
        />
        <Link href="#" className="text-sky-600 text-sm underline">
          Esqueceu sua senha?
        </Link>
      </div>

      <button
        className="bg-sky-400 border border-sky-500 text-zinc-50 font-bold h-[50px] w-full hover:bg-sky-500"
        type="submit"
      >
        Entrar
      </button>
    </form>
  );
}
