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

export const startAttempt = async (quizId: string) => {
  const headers = await getAuthHeaders();
  
  const res = await fetch(`${API_URL}/student/quizzes/${quizId}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  return res.json();
};

export const getQuizQuestions = async (quizId: string) => {
  const headers = await getAuthHeaders();
  
  const res = await fetch(`${API_URL}/student/quizzes/${quizId}/questions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    next: { revalidate: 0 },
  });

  return res.json();
};

export const submitAttempt = async (quizId: string, answers: { questionId: string; selectedOption: string }[]) => {
  const headers = await getAuthHeaders();
  
  const res = await fetch(`${API_URL}/student/quizzes/${quizId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ answers }),
  });

  return res.json();
};

export const getAttemptResult = async (attemptId: string) => {
  const headers = await getAuthHeaders();
  
  const res = await fetch(`${API_URL}/student/attempts/${attemptId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    next: { revalidate: 0 },
  });

  return res.json();
};

export const getAttemptHistory = async (quizId: string) => {
  const headers = await getAuthHeaders();
  
  const res = await fetch(`${API_URL}/student/quizzes/${quizId}/attempts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    next: { revalidate: 0 },
  });

  return res.json();
};
