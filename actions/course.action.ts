"use server";

import { getAllCourses, getSingleCourse } from "@/services/course.service";
import { CourseQuery } from "@/components/modules/course/types";

export const getAllCoursesAction = async (params: CourseQuery = {}) => {
  try {
    const res = await getAllCourses(params);
    return {
      success: true,
      message: res.message || "Courses fetched successfully",
      data: res.data || [],
      meta: res.meta || { page: 1, limit: 10, total: 0, totalPages: 1 },
    };
  } catch (error: any) {
    console.error("Failed to fetch courses:", error.message);
    return {
      success: false,
      message: "Network error: Failed to load courses.",
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 1 },
    };
  }
};

export const getSingleCourseAction = async (id: string) => {
  try {
    const res = await getSingleCourse(id);
    return {
      success: true,
      message: res.message || "Course details fetched successfully",
      data: res.data,
    };
  } catch (error: any) {
    console.error(`Failed to fetch course ${id}:`, error.message);
    return {
      success: false,
      message: "Network error: Failed to load course details.",
      data: null,
    };
  }
};
