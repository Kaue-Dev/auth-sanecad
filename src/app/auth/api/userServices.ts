interface userData {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

interface userLoginData {
  email: string;
  password: string;
}

export async function registerUser(data: userData) {
  try {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) return response;
  } catch (error) {
    console.error("ERROR", error);
  }
}

export async function loginUser(data: userLoginData) {
  console.log(data);
}