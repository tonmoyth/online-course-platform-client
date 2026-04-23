"use server";
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

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreateQuizPayload {
  title: string;
  timeLimitMinutes?: number;
  passingScore?: number;
  maxAttempts?: number;
}

export interface QuestionPayload {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: "A" | "B" | "C" | "D";
  orderIndex?: number;
}

export interface UpdateQuestionPayload extends Partial<QuestionPayload> { }

// ─── Service Functions ────────────────────────────────────────────────────────

export const createQuiz = async (
  courseId: string,
  payload: CreateQuizPayload
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/instructor/courses/${courseId}/quizzes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  return res.json();
};

export const addQuestion = async (
  quizId: string,
  payload: QuestionPayload
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/instructor/quizzes/${quizId}/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  return res.json();
};

export const updateQuestion = async (
  questionId: string,
  payload: UpdateQuestionPayload
) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/instructor/questions/${questionId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  return res.json();
};

export const deleteQuestion = async (questionId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/instructor/questions/${questionId}`, {
    method: "DELETE",
    headers,
    credentials: "include",
  });

  return res.json();
};

export const getQuizDetails = async (quizId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/instructor/quizzes/${quizId}`, {
    method: "GET",
    headers,
    next: { revalidate: 0 },
  });

  return res.json();
};

export const getQuizAttempts = async (quizId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_URL}/instructor/quizzes/${quizId}/attempts`, {
    method: "GET",
    headers,
    next: { revalidate: 0 },
  });

  return res.json();
};
