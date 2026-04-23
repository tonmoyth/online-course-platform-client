import { getLessonsAction } from "@/actions/instructor/lesson.action";
import LessonManager from "@/components/modules/instructor/lessons/LessonManager";
import { ChevronLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ManageCoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function ManageCoursePage({ params }: ManageCoursePageProps) {
  const { id } = await params;
  const response = await getLessonsAction(id);
  const lessons = response?.data ?? [];

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-5xl">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/draft-course">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 rounded-full">
            <ChevronLeft className="h-4 w-4" />
            Back to Drafts
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Course Curriculum</h1>
            <p className="text-muted-foreground text-sm font-medium">
              Manage lessons and quizzes for this course.
            </p>
          </div>
        </div>
      </div>

      <LessonManager courseId={id} initialLessons={lessons} />
    </div>
  );
}
