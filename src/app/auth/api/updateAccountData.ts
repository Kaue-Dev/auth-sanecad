interface INewData {
  id: number | null;
  name: string;
  cpf: string;
  email: string;
  password: string;
}

export async function updateAccountData(URL: string, newData: INewData) {
  const response = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (response.ok) {
    console.log("Dados atualizados com sucesso", response);
  }
}
