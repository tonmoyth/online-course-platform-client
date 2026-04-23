import { getEnrolledCoursesAction } from "@/actions/enrollment.actions";
import EnrolledCourses from "@/components/modules/student/enrollment/EnrolledCourses";
import { GraduationCap } from "lucide-react";

export default async function MyLearningPage() {
  const response = await getEnrolledCoursesAction();
  const enrollments = response?.data || [];

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <GraduationCap className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">My Learning</h1>
            <p className="text-muted-foreground text-sm font-medium mt-1">
              Pick up right where you left off and track your progress.
            </p>
          </div>
        </div>
      </div>

      <EnrolledCourses enrollments={enrollments} />
    </div>
  );
}
