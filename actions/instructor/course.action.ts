"use server";


import { 
  createCourse, 
  getDraftCourses, 
  updateCourse, 
  submitCourse, 
  deleteCourse, 
  getCourseStudents 
} from "@/services/instructor/course.service";

export const updateCourseAction = async (id: string, data: any) => {
  const res = await updateCourse(id, data);
  if (res.success) {
    revalidatePath("/instructor/dashboard/draft-course");
  }
  return res;
};

export const submitCourseAction = async (id: string) => {
  const res = await submitCourse(id);
  if (res.success) {
    revalidatePath("/instructor/dashboard/draft-course");
  }
  return res;
};

export const deleteCourseAction = async (id: string) => {
  const res = await deleteCourse(id);
  if (res.success) {
    revalidatePath("/instructor/dashboard/draft-course");
  }
  return res;
};

export const getCourseStudentsAction = async (id: string) => {
  return await getCourseStudents(id);
};

export const getDraftCoursesAction = async (params: any) => {
  const res = await getDraftCourses(params);
  return res;
};
import { revalidatePath } from "next/cache";

export const createCourseAction = async (data: any) => {
  const res = await createCourse(data);

  if (!res.success) {
    throw new Error(res.message || "Failed to create course");
  }

  revalidatePath("/instructor/dashboard");
  return res;
};
