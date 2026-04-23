import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get("sessionToken")?.value;

  return accessToken && sessionToken
    ? { cookie: `accessToken=${accessToken}; sessionToken=${sessionToken}` }
    : {};
};

export const getLessons = async (courseId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/instructor/courses/${courseId}/lessons`, {
    method: "GET",
    headers,
    next: { revalidate: 0 },
  });

  return res.json();
};

export const createLesson = async (courseId: string, data: Record<string, unknown>) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/instructor/courses/${courseId}/lessons`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return res.json();
};

export const updateLesson = async (lessonId: string, data: Record<string, unknown>) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/instructor/lessons/${lessonId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return res.json();
};

export const deleteLesson = async (lessonId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/instructor/lessons/${lessonId}`, {
    method: "DELETE",
    headers,
    credentials: "include",
  });

  return res.json();
};

export const reorderLessons = async (
  courseId: string,
  lessons: { id: string; orderIndex: number }[]
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${API_URL}/instructor/courses/${courseId}/lessons/reorder`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ lessons }),
      credentials: "include",
    }
  );

  return res.json();
};
