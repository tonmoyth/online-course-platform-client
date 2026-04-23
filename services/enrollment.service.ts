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

export const enrollInCourse = async (courseId: string) => {
  const headers = await getAuthHeaders();
  
  const res = await fetch(`${API_URL}/student/courses/${courseId}/enroll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  return res.json();
};

export const getEnrolledCourses = async () => {
  const headers = await getAuthHeaders();
  
  const res = await fetch(`${API_URL}/student/enrollments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    // We disable cache to ensure we get fresh enrollments
    next: { revalidate: 0 },
  });

  return res.json();
};

export const getCourseLearningDetails = async (courseId: string) => {
  const headers = await getAuthHeaders();
  
  const res = await fetch(`${API_URL}/student/courses/${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    next: { revalidate: 0 },
  });

  return res.json();
};
