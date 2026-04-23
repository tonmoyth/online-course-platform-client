"use server";

import { revalidatePath } from "next/cache";
import {
  startAttempt,
  getQuizQuestions,
  submitAttempt,
  getAttemptResult,
  getAttemptHistory,
} from "@/services/quizAttempt.service";

export const startAttemptAction = async (quizId: string) => {
  try {
    const res = await startAttempt(quizId);
    return {
      success: res.success,
      message: res.message || (res.success ? "Quiz started successfully" : "Failed to start quiz"),
      data: res.data || null,
    };
  } catch (error: any) {
    console.error(`Failed to start quiz ${quizId}:`, error.message);
    return { success: false, message: "Network error: Could not start quiz.", data: null };
  }
};

export const getQuizQuestionsAction = async (quizId: string) => {
  try {
    const res = await getQuizQuestions(quizId);
    return {
      success: res.success,
      message: res.message || "Questions fetched successfully",
      data: res.data || [],
    };
  } catch (error: any) {
    console.error(`Failed to fetch questions for quiz ${quizId}:`, error.message);
    return { success: false, message: "Network error: Failed to load questions.", data: [] };
  }
};

export const submitAttemptAction = async (quizId: string, answers: { questionId: string; selectedOption: string }[]) => {
  try {
    const res = await submitAttempt(quizId, answers);
    
    if (res.success) {
      // Revalidate history page if it exists
      revalidatePath(`/dashboard/quiz/${quizId}/history`);
    }

    return {
      success: res.success,
      message: res.message || "Quiz submitted successfully",
      data: res.data || null,
    };
  } catch (error: any) {
    console.error(`Failed to submit quiz ${quizId}:`, error.message);
    return { success: false, message: "Network error: Could not submit quiz.", data: null };
  }
};

export const getAttemptResultAction = async (attemptId: string) => {
  try {
    const res = await getAttemptResult(attemptId);
    return {
      success: res.success,
      message: res.message || "Result fetched successfully",
      data: res.data || null,
    };
  } catch (error: any) {
    console.error(`Failed to fetch attempt result ${attemptId}:`, error.message);
    return { success: false, message: "Network error: Failed to load result.", data: null };
  }
};

export const getAttemptHistoryAction = async (quizId: string) => {
  try {
    const res = await getAttemptHistory(quizId);
    return {
      success: res.success,
      message: res.message || "History fetched successfully",
      data: res.data || [],
    };
  } catch (error: any) {
    console.error(`Failed to fetch attempt history for quiz ${quizId}:`, error.message);
    return { success: false, message: "Network error: Failed to load history.", data: [] };
  }
};
