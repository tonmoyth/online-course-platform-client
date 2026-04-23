import { getSingleCourseAction } from "@/actions/course.action";
import CourseDetails from "@/components/modules/course/CourseDetails";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CourseDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const { id } = await params;
  
  const response = await getSingleCourseAction(id);

  if (!response.success || !response.data) {
    notFound();
  }

  const course = response.data;

  return (
    <div className="bg-muted/5 min-h-screen">
      {/* Navigation Bar */}
      <div className="bg-background border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/course">
            <Button variant="ghost" size="sm" className="rounded-full gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>

      <CourseDetails course={course} />
    </div>
  );
}
