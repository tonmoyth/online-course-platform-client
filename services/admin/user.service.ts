import { cookies } from "next/headers";

export const getUsers = async (query: Record<string, any>) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;


  const cleanQuery = Object.fromEntries(
    Object.entries(query).filter(([_, v]) => v != null && v !== "")
  );

  const params = new URLSearchParams(cleanQuery as any).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users?${params}`,
    {
      method: "GET",
      headers: {
        cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}`,
      },
      cache: "no-store",
    }
  );

  const result = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch users");
  }

  return result;
};

export const approveUser = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}/approve`,
    {
      method: "PATCH",
      headers: {
        cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}`,
      },
    }
  );

  return res.json();
};

export const rejectUser = async (id: string, remark: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}/reject`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}`,
      },
      body: JSON.stringify({ remark }),
    }
  );

  return res.json();
};

export const updateUser = async (id: string, data: any) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
};

export const assignUserRole = async (userId: string, roleId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/assign-role`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}`,
      },
      body: JSON.stringify({ roleId }),
    }
  );

  return res.json();
};
