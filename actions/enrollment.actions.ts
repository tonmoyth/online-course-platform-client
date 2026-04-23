"use server";

import { revalidatePath } from "next/cache";
import {
  enrollInCourse,
  getEnrolledCourses,
  getCourseLearningDetails,
} from "@/services/enrollment.service";

export const enrollCourseAction = async (courseId: string) => {
  try {
    const res = await enrollInCourse(courseId);
    
    if (res.success) {
      revalidatePath("/dashboard/my-learning");
      return { success: true, message: res.message || "Successfully enrolled!" };
    } else {
      return { success: false, message: res.message || "Failed to enroll in the course." };
    }
  } catch (error: any) {
    console.error(`Failed to enroll in course ${courseId}:`, error.message);
    return { success: false, message: "Network error: Could not process enrollment." };
  }
};

export const getEnrolledCoursesAction = async () => {
  try {
    const res = await getEnrolledCourses();
    return {
      success: true,
      message: res.message || "Enrolled courses fetched successfully",
      data: res.data || [],
    };
  } catch (error: any) {
    console.error("Failed to fetch enrolled courses:", error.message);
    return {
      success: false,
      message: "Network error: Failed to load enrolled courses.",
      data: [],
    };
  }
};

export const getCourseLearningDetailsAction = async (courseId: string) => {
  try {
    const res = await getCourseLearningDetails(courseId);
    return {
      success: true,
      message: res.message || "Course details fetched successfully",
      data: res.data || null,
    };
  } catch (error: any) {
    console.error(`Failed to fetch learning details for course ${courseId}:`, error.message);
    return {
      success: false,
      message: "Network error: Failed to load learning details.",
      data: null,
    };
  }
};
