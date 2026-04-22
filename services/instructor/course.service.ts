import { cookies } from "next/headers";

export const createCourse = async (data: any) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instructor/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && sessionToken
        ? { cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}` }
        : {}),
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return res.json();
};

export const getDraftCourses = async (params: any) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instructor/courses/drafts?${query.toString()}`, {
    method: "GET",
    headers: {
      ...(accessToken && sessionToken
        ? { cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}` }
        : {}),
    },
    next: { revalidate: 0 },
  });

  return res.json();
};

export const updateCourse = async (id: string, data: any) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instructor/courses/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && sessionToken
        ? { cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}` }
        : {}),
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return res.json();
};

export const submitCourse = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instructor/courses/${id}/submit`, {
    method: "PATCH",
    headers: {
      ...(accessToken && sessionToken
        ? { cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}` }
        : {}),
    },
    credentials: "include",
  });

  return res.json();
};

export const deleteCourse = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instructor/courses/${id}`, {
    method: "DELETE",
    headers: {
      ...(accessToken && sessionToken
        ? { cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}` }
        : {}),
    },
    credentials: "include",
  });

  return res.json();
};

export const getCourseStudents = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instructor/courses/${id}/students`, {
    method: "GET",
    headers: {
      ...(accessToken && sessionToken
        ? { cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}` }
        : {}),
    },
    credentials: "include",
  });

  return res.json();
};
