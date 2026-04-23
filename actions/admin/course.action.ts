"use server";

import {
  getCourses,
  approveCourse,
  rejectCourse,
  unpublishCourse,
  deleteCourse,
} from "@/services/admin/course.service";
import { revalidatePath } from "next/cache";

export const getCoursesAction = async (params: Record<string, any>) => {
  const data = await getCourses(params);

  return data
};

export const approveCourseAction = async (id: string) => {
  const res = await approveCourse(id);
  if (!res.success) throw new Error(res.message || "Failed to approve course");
  revalidatePath("/dashboard/course-oversight");
  return res;
};

export const rejectCourseAction = async (id: string, remark: string) => {
  const res = await rejectCourse(id, remark);
  if (!res.success) throw new Error(res.message || "Failed to reject course");
  revalidatePath("/dashboard/course-oversight");
  return res;
};

export const unpublishCourseAction = async (id: string) => {
  const res = await unpublishCourse(id);
  if (!res.success) throw new Error(res.message || "Failed to unpublish course");
  revalidatePath("/dashboard/course-oversight");
  return res;
};

export const deleteCourseAction = async (id: string) => {
  const res = await deleteCourse(id);
  if (!res.success) throw new Error(res.message || "Failed to delete course");
  revalidatePath("/dashboard/course-oversight");
  return res;
};
