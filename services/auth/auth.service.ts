import { cookies } from "next/headers";

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
  console.log("res", res)

  const result = await res.json();

  if (!res.ok) {
    return { success: false, message: result.message || "Login failed" };
  }

  return result;
};


export const getUserInfo = async () => {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("accessToken")?.value
  const session = cookieStore.get("sessionToken")?.value

  if (!accessToken || !session) {
    return null
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: `accessToken=${accessToken}; sessionToken=${session}`,
      },
    })

    const responseData = await response.json()

    if (!responseData || !responseData.success) {
      console.warn("auth/me response missing success", responseData)
      return null
    }

    // API returns either {data: user} or {data: {user}}
    const fetchedData = responseData.data

    if (!fetchedData) {
      return null
    }



    return fetchedData
  } catch (error) {
    console.error("Error fetching user info:", error)
    return null
  }
}

export const logoutUser = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const session = cookieStore.get("sessionToken")?.value

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && session ? { cookie: `accessToken=${accessToken}; sessionToken=${session}` } : {})
    },
  });

  const result = await res.json().catch(() => ({}));

  if (!res.ok) {
    return { success: false, message: result?.message || "Logout failed" };
  }

  return result;
};
