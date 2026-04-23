import { Course } from "./types";
import CourseCard from "./CourseCard";
import { BookX } from "lucide-react";

interface CourseGridProps {
  courses: Course[];
  isLoading?: boolean;
}

function CourseSkeleton() {
  return (
    <div className="flex flex-col h-full rounded-2xl border-none shadow-md overflow-hidden bg-card animate-pulse">
      <div className="aspect-video w-full bg-muted/40" />
      <div className="p-5 space-y-4 flex-grow">
        <div className="h-6 bg-muted/40 rounded-md w-3/4" />
        <div className="h-4 bg-muted/40 rounded-md w-1/2" />
        <div className="flex items-center gap-3 pt-2">
          <div className="h-8 w-8 bg-muted/40 rounded-full" />
          <div className="h-4 bg-muted/40 rounded-md w-24" />
        </div>
      </div>
      <div className="p-5 pt-0 mt-auto">
        <div className="h-10 bg-muted/40 rounded-xl w-full" />
      </div>
    </div>
  );
}

export default function CourseGrid({ courses, isLoading = false }: CourseGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <CourseSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-muted/10 rounded-3xl border border-dashed">
        <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <BookX className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2">No courses found</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't find any courses matching your criteria. Try adjusting your filters or searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
