"use client";

import Link from "next/link";
import { TextInput } from "../components/TextInput";
import { Label } from "../components/Label";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../api/userServices";
import { useValidation } from "../hooks/useValidation";
import { PersonTypeSelector } from "../components/PersonTypeSelector";
import { PasswordInput } from "../components/PasswordInput";

export default function Signup() {
  const router = useRouter();

  const {
    isCpfInvalid,
    isCnpjInvalid,
    isPasswordInvalid,
    validateCPF,
    validateCNPJ,
    validatePassword,
  } = useValidation();

  const [personType, setPersonType] = useState("Pessoa Física");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    let isValid = true;
    if (personType === "Pessoa Física" && !validateCPF(cpf)) isValid = false;
    if (personType === "Pessoa Jurídica" && !validateCNPJ(cnpj)) isValid = false;
    if (!validatePassword(password, confirmPassword)) isValid = false;
    if (!isValid) return;

    await registerUser({
      name: fullName,
      cpf: cpf || cnpj,
      email: email,
      password: password,
    })
      .then(() => router.push("/"))
      .catch((error) => console.error(error));
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
          setPersonType={setPersonType}
        />

        <div className="flex flex-col gap-1">
          <Label htmlFor="nomeCompleto">Nome Completo</Label>
          <TextInput
            type="text"
            id="nomeCompleto"
            onChange={(ev) => setFullName(ev.target.value)}
            value={fullName}
            required
          />
        </div>

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

        <div>
          {personType === "Pessoa Física" && (
            <div className="flex flex-col gap-1">
              <Label htmlFor="cpf">CPF</Label>
              <TextInput
                type="text"
                id="cpf"
                onChange={(ev) => setCpf(ev.target.value)}
                value={cpf}
                required
                isInvalid={isCpfInvalid}
              />
            </div>
          )}
          {personType === "Pessoa Jurídica" && (
            <div className="flex flex-col gap-1">
              <Label htmlFor="cnpj">CNPJ</Label>
              <TextInput
                type="text"
                id="cnpj"
                onChange={(ev) => setCnpj(ev.target.value)}
                value={cnpj}
                required
                isInvalid={isCnpjInvalid}
              />
            </div>
          )}
          {isCpfInvalid && (
            <p className="text-red-500 text-sm mt-1 ml-1">CPF Inválido.</p>
          )}
          {isCnpjInvalid && (
            <p className="text-red-500 text-sm mt-1 ml-1">CNPJ Inválido.</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 max-[650px]:flex-col">
            <PasswordInput
              setPassword={setPassword}
              password={password}
              id="senha"
              label="Senha"
              isInvalid={isPasswordInvalid}
            />
            <PasswordInput
              setPassword={setConfirmPassword}
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
