import { useState } from "react";

export function useValidation() {
  const [isCpfInvalid, setIsCpfInvalid] = useState(false);
  const [isCnpjInvalid, setIsCnpjInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  function validateCPF (cpf: string) {
    if (cpf.length !== 11) {
      setIsCpfInvalid(true);
      return false;
    }

    setIsCpfInvalid(false);
    return true;
  }

  function validateCNPJ (cnpj: string) {
    if (cnpj.length !== 14) {
      setIsCnpjInvalid(true);
      return false;
    }

    setIsCnpjInvalid(false);
    return true;
  }

  function validatePassword(password: string, confirmPassword: string) {
    const passwordEqualsConfirmPassword = password === confirmPassword;
    const passwordLengthIsValid = password.length >= 6;

    if (!passwordEqualsConfirmPassword || !passwordLengthIsValid) {
      setIsPasswordInvalid(true);
      return false;
    }

    setIsPasswordInvalid(false);
    return true;
  }

  return {
    isCpfInvalid,
    isCnpjInvalid,
    isPasswordInvalid,
    validateCPF,
    validateCNPJ,
    validatePassword
  }
}