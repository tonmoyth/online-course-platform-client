import { getCourseLearningDetailsAction } from "@/actions/enrollment.actions";
import LearningPage from "@/components/modules/student/enrollment/LearningPage";
import { notFound } from "next/navigation";

interface CourseLearningPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseLearningPage({ params }: CourseLearningPageProps) {
  const { courseId } = await params;
  
  const response = await getCourseLearningDetailsAction(courseId);

  if (!response.success || !response.data) {
    notFound();
  }

  // Ensure lessons array exists
  const courseData = {
    ...response.data,
    lessons: response.data.lessons || []
  };

  return <LearningPage course={courseData} />;
}
