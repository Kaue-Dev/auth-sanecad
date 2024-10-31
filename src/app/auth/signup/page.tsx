"use client";

import Link from "next/link";
import { TextInput } from "../components/TextInput";
import { Label } from "../components/Label";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../api/userServices";
import { PersonTypeSelector } from "../components/PersonTypeSelector";
import { PasswordInput } from "../components/PasswordInput";
import { PersonTypeInput } from "../components/PersonTypeInput";
import { useValidation } from "../hooks/useValidation";

interface IFormValues {
  personType: string;
  fullName: string;
  email: string;
  cpf: string;
  cnpj: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState<IFormValues>({
    personType: "Pessoa Física",
    fullName: "",
    email: "",
    cpf: "",
    cnpj: "",
    password: "",
    confirmPassword: "",
  })

  const { personType, fullName, email, cpf, cnpj, password, confirmPassword } = formData;

  const [isCpfInvalid, setIsCpfInvalid] = useState(false);
  const [isCnpjInvalid, setIsCnpjInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const { validateCPF, validateCNPJ, validatePassword } = useValidation();

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    let isValid = true;
    if (personType === "Pessoa Física") {
      setIsCpfInvalid(!validateCPF(cpf));
      isValid = isValid && validateCPF(cpf);
    }
    if (personType === "Pessoa Jurídica") {
      setIsCnpjInvalid(!validateCNPJ(cnpj));
      isValid = isValid && validateCNPJ(cnpj);
    }
    setIsPasswordInvalid(!validatePassword(password, confirmPassword));
    if (!isValid) return;

    const response = await registerUser({
      name: fullName,
      cpf: cpf || cnpj,
      email: email,
      password: password,
    })

    if (response?.ok) router.push("/")
  }

  return (
    <div className="flex flex-col justify-center gap-8 min-h-screen max-w-[600px] mx-auto max-[650px]:max-w-[90%]">
      <div className="flex flex-col">
        <h1>Registrar</h1>
        <p>Preencha suas informações para criar sua conta</p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <PersonTypeSelector
          personType={personType}
          setPersonType={(value) => setFormData({ ...formData, personType: value })}
        />

        <div className="flex flex-col gap-1">
          <Label htmlFor="nomeCompleto">Nome Completo</Label>
          <TextInput
            type="text"
            id="nomeCompleto"
            value={fullName}
            onChange={(ev) => setFormData({ ...formData, fullName: ev.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <TextInput
            type="email"
            id="email"
            value={email}
            onChange={(ev) => setFormData({ ...formData, email: ev.target.value })}
            required
          />
        </div>

        <PersonTypeInput 
          id={personType === "Pessoa Física" ? "cpf" : "cnpj"}
          label={personType === "Pessoa Física" ? "CPF" : "CNPJ"}
          setState={(value) => setFormData({ ...formData, [personType === "Pessoa Física" ? "cpf" : "cnpj"]: value })}
          value={personType === "Pessoa Física" ? cpf : cnpj}
          isInvalid={personType === "Pessoa Física" ? isCpfInvalid : isCnpjInvalid}
          errorMessage={personType === "Pessoa Física" ? "CPF Inválido." : "CNPJ Inválido."}
        />

        <div>
          <div className="flex items-center gap-2 max-[650px]:flex-col">
            <PasswordInput
              setPassword={(value) => setFormData({ ...formData, password: value })}
              password={password}
              id="senha"
              label="Senha"
              isInvalid={isPasswordInvalid}
            />
            <PasswordInput
              setPassword={(value) => setFormData({ ...formData, confirmPassword: value })}
              password={confirmPassword}
              id="confirmarSenha"
              label="Confirmar Senha"
              isInvalid={isPasswordInvalid}
            />
          </div>
          {isPasswordInvalid && (
            <p className="text-red-500 text-sm mt-1 ml-1">As senhas não conferem.</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-1 my-2 max-[650px]:flex-col">
          <p className="text-zinc-400">Ao criar sua conta você concorda com nossos</p>
          <Link className="text-sky-600 underline" href="#">Termos e Condições</Link>
        </div>

        <button
          className="bg-sky-400 border border-sky-500 text-zinc-50 font-bold h-[50px] w-full hover:bg-sky-500"
          type="submit"
        >
          Criar Conta
        </button>

        <div className="flex items-center justify-center gap-1 mt-2">
          <p className="text-zinc-400">Já possui uma conta?</p>
          <Link className="text-sky-600 underline" href="/auth/login">Entrar</Link>
        </div>
      </form>
    </div>
  );
}
