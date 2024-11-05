export async function getAccounts(URL: string) {
  const response = await fetch(URL);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
}