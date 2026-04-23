"use server";

import { revalidatePath } from "next/cache";
import {
  createLesson,
  deleteLesson,
  getLessons,
  reorderLessons,
  updateLesson,
} from "@/services/instructor/lesson.service";

export const getLessonsAction = async (courseId: string) => {
  return await getLessons(courseId);
};

export const createLessonAction = async (
  courseId: string,
  data: Record<string, unknown>
) => {
  const result = await createLesson(courseId, data);
  if (result.success) revalidatePath(`/dashboard/manage-course/${courseId}`);
  return result;
};

export const updateLessonAction = async (
  lessonId: string,
  data: Record<string, unknown>,
  courseId: string
) => {
  const result = await updateLesson(lessonId, data);
  if (result.success) revalidatePath(`/dashboard/manage-course/${courseId}`);
  return result;
};

export const deleteLessonAction = async (
  lessonId: string,
  courseId: string
) => {
  const result = await deleteLesson(lessonId);
  if (result.success) revalidatePath(`/dashboard/manage-course/${courseId}`);
  return result;
};

export const reorderLessonsAction = async (
  courseId: string,
  lessons: { id: string; orderIndex: number }[]
) => {
  const result = await reorderLessons(courseId, lessons);
  if (result.success) revalidatePath(`/dashboard/manage-course/${courseId}`);
  return result;
};
