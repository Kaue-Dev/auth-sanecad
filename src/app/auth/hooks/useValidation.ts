export function useValidation() {
  function validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const cpfArray = cpf.split("").map(Number);
    const firstDigit =
      cpfArray.slice(0, 9).reduce((acc, value, index) => acc + value * (10 - index), 0) % 11;
    const checkFirstDigit = firstDigit < 2 ? 0 : 11 - firstDigit;

    const secondDigit =
      cpfArray.slice(0, 10).reduce((acc, value, index) => acc + value * (11 - index), 0) % 11;
    const checkSecondDigit = secondDigit < 2 ? 0 : 11 - secondDigit;

    return checkFirstDigit === cpfArray[9] && checkSecondDigit === cpfArray[10];
  }

  function validateCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, "");

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    const cnpjArray = cnpj.split("").map(Number);
    const firstDigit =
      cnpjArray.slice(0, 12).reduce((acc, value, index) => acc + value * (5 - (index % 4)), 0) % 11;
    const checkFirstDigit = firstDigit < 2 ? 0 : 11 - firstDigit;

    const secondDigit =
      cnpjArray.slice(0, 13).reduce((acc, value, index) => acc + value * (6 - (index % 5)), 0) % 11;
    const checkSecondDigit = secondDigit < 2 ? 0 : 11 - secondDigit;

    return checkFirstDigit === cnpjArray[12] && checkSecondDigit === cnpjArray[13]
  }

  function validatePassword(password: string, confirmPassword: string): boolean {
    return password.length >= 8 && password === confirmPassword;
  }

  return { validateCPF, validateCNPJ, validatePassword };
}
