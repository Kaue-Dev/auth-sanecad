"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../api/userServices";
import { PersonTypeSelector } from "./PersonTypeSelector";
import { TextInput } from "./TextInput";
import { Label } from "./Label";
import { PasswordInput } from "./PasswordInput";
import { PersonTypeInput } from "./PersonTypeInput";
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

export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<IFormValues>({
    personType: "Pessoa Física",
    fullName: "",
    email: "",
    cpf: "",
    cnpj: "",
    password: "",
    confirmPassword: "",
  });

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
    if (!validatePassword(password, confirmPassword)) {
      setIsPasswordInvalid(true);
      isValid = false;
    }
    if (!isValid) return;

    const response = await registerUser({
      name: fullName,
      cpf: cpf || cnpj,
      email: email,
      password: password,
    });

    if (response?.ok) router.push("/");
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <PersonTypeSelector
        personType={personType}
        setPersonType={(value) =>
          setFormData({ ...formData, personType: value })
        }
      />

      <div className="flex flex-col gap-1">
        <Label htmlFor="nomeCompleto">Nome Completo</Label>
        <TextInput
          type="text"
          id="nomeCompleto"
          value={fullName}
          onChange={(ev) =>
            setFormData({ ...formData, fullName: ev.target.value })
          }
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <TextInput
          type="email"
          id="email"
          value={email}
          onChange={(ev) =>
            setFormData({ ...formData, email: ev.target.value })
          }
          required
        />
      </div>

      <PersonTypeInput
        id={personType === "Pessoa Física" ? "cpf" : "cnpj"}
        label={personType === "Pessoa Física" ? "CPF" : "CNPJ"}
        setState={(value) =>
          setFormData({
            ...formData,
            [personType === "Pessoa Física" ? "cpf" : "cnpj"]: value,
          })
        }
        value={personType === "Pessoa Física" ? cpf : cnpj}
        isInvalid={
          personType === "Pessoa Física" ? isCpfInvalid : isCnpjInvalid
        }
        errorMessage={
          personType === "Pessoa Física" ? "CPF Inválido." : "CNPJ Inválido."
        }
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
            setPassword={(value) =>
              setFormData({ ...formData, confirmPassword: value })
            }
            password={confirmPassword}
            id="confirmarSenha"
            label="Confirmar Senha"
            isInvalid={isPasswordInvalid}
          />
        </div>

        {isPasswordInvalid && (
          <p className="text-red-500 text-sm mt-1 ml-1">
            As senhas não conferem.
          </p>
        )}
      </div>

      <button
        className="bg-sky-400 border border-sky-500 text-zinc-50 font-bold h-[50px] w-full hover:bg-sky-500"
        type="submit"
      >
        Criar Conta
      </button>
    </form>
  );
}
