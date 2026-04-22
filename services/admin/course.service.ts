import { cookies } from "next/headers";

export const getCourses = async (params: Record<string, any>) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const cleanQuery = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != null && v !== "")
  );
  const query = new URLSearchParams(cleanQuery as any).toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/courses?${query}`,
    {
      method: "GET",
      headers: {
        cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}`,
      },
      cache: "no-store",
    }
  );

  return res.json();
};

export const approveCourse = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/courses/${id}/approve`,
    {
      method: "PATCH",
      headers: {
        cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}`,
      },
    }
  );

  return res.json();
};

export const rejectCourse = async (id: string, remark: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/courses/${id}/reject`,
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

export const unpublishCourse = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/courses/${id}/unpublish`,
    {
      method: "PATCH",
      headers: {
        cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}`,
      },
    }
  );

  return res.json();
};

export const deleteCourse = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/courses/${id}`,
    {
      method: "DELETE",
      headers: {
        cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}`,
      },
    }
  );

  return res.json();
};
