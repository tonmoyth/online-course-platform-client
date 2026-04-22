import { cookies } from "next/headers";

export const getRoles = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/roles`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return { success: false, data: [] };
  }

  return res.json();
};

export const createRole = async (data: any) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && sessionToken ? { cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}` } : {})
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return res.json();
};
