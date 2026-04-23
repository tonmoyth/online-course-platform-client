import { Course, CourseQuery, PaginatedResponse } from "@/components/modules/course/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllCourses = async (
  params: CourseQuery
): Promise<PaginatedResponse<Course[]>> => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_URL}/courses?${query.toString()}`, {
    method: "GET",
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
};

export const getSingleCourse = async (
  id: string
): Promise<{ success: boolean; message: string; data: Course }> => {
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: "GET",
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch course details");
  }

  return res.json();
};
