export async function deleteAccount(URL: string) {
  const response = await fetch(URL, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  }
}