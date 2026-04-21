export const registerUser = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { success: false, message: result.message || "Registration failed" };
  }

  return result;
};

export const loginUser = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  const result = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { success: false, message: result.message || "Login failed" };
  }

  return result;
};
