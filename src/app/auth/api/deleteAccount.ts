export async function deleteAccount(URL: string) {
  const response = await fetch(URL, {
    method: "DELETE",
  });

  if (response.ok) {
    const text = await response.text();
    const data = text && JSON.parse(text);

    if (data) {
      console.log("Conta deletada", data);
    }

    console.log("Conta deletada com sucesso, nenhum conteúdo retornado.");
  }

  if (response.status === 400) {
    alert("Conta não encontrada");
  }
}