"use server";

import { revalidatePath } from "next/cache";
import {
  createQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  getQuizDetails,
  getQuizAttempts,
  type CreateQuizPayload,
  type QuestionPayload,
  type UpdateQuestionPayload,
} from "@/services/quiz.service";

// ─── Structured Response Type ─────────────────────────────────────────────────

export interface ActionResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// ─── Quiz Actions ─────────────────────────────────────────────────────────────

export const createQuizAction = async (
  courseId: string,
  payload: CreateQuizPayload
): Promise<ActionResponse> => {
  try {
    const result = await createQuiz(courseId, payload);
    if (!result.success) {
      return { success: false, message: result.message ?? "Failed to create quiz" };
    }
    revalidatePath(`/dashboard/manage-course/${courseId}`);
    return { success: true, message: "Quiz created successfully", data: result.data };
  } catch {
    return { success: false, message: "Network error: Failed to create quiz" };
  }
};

// ─── Question Actions ─────────────────────────────────────────────────────────

export const addQuestionAction = async (
  quizId: string,
  courseId: string,
  payload: QuestionPayload
): Promise<ActionResponse> => {
  try {
    const result = await addQuestion(quizId, payload);
    if (!result.success) {
      return { success: false, message: result.message ?? "Failed to add question" };
    }
    revalidatePath(`/dashboard/manage-course/${courseId}`);
    return { success: true, message: "Question added successfully", data: result.data };
  } catch {
    return { success: false, message: "Network error: Failed to add question" };
  }
};

export const updateQuestionAction = async (
  questionId: string,
  courseId: string,
  payload: UpdateQuestionPayload
): Promise<ActionResponse> => {
  try {
    const result = await updateQuestion(questionId, payload);
    if (!result.success) {
      return { success: false, message: result.message ?? "Failed to update question" };
    }
    revalidatePath(`/dashboard/manage-course/${courseId}`);
    return { success: true, message: "Question updated successfully", data: result.data };
  } catch {
    return { success: false, message: "Network error: Failed to update question" };
  }
};

export const deleteQuestionAction = async (
  questionId: string,
  courseId: string
): Promise<ActionResponse> => {
  try {
    const result = await deleteQuestion(questionId);
    if (!result.success) {
      return { success: false, message: result.message ?? "Failed to delete question" };
    }
    revalidatePath(`/dashboard/manage-course/${courseId}`);
    return { success: true, message: "Question deleted successfully" };
  } catch {
    return { success: false, message: "Network error: Failed to delete question" };
  }
};

// ─── Read Actions (for client components) ────────────────────────────────────

export const getQuizDetailsAction = async (
  quizId: string
): Promise<ActionResponse> => {
  try {
    const result = await getQuizDetails(quizId);
    if (!result.success) {
      return { success: false, message: result.message ?? "Failed to load quiz" };
    }
    return { success: true, message: "Quiz loaded", data: result.data };
  } catch {
    return { success: false, message: "Network error: Failed to load quiz" };
  }
};

export const getQuizAttemptsAction = async (
  quizId: string
): Promise<ActionResponse> => {
  try {
    const result = await getQuizAttempts(quizId);
    if (!result.success) {
      return { success: false, message: result.message ?? "Failed to load attempts" };
    }
    return { success: true, message: "Attempts loaded", data: result.data };
  } catch {
    return { success: false, message: "Network error: Failed to load attempts" };
  }
};
