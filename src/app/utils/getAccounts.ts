export async function getAccounts(URL: string) {
  const response = await fetch(URL);

  if (response.ok) {
    const data = JSON.stringify(response);
    console.log(data);
    return data;
  }
}