import { getAllCoursesAction } from "@/actions/course.action";
import CourseGrid from "@/components/modules/course/CourseGrid";
import CourseFilters from "@/components/modules/course/CourseFilters";
import CourseSearch from "@/components/modules/course/CourseSearch";
import CoursePagination from "@/components/modules/course/CoursePagination";
import { GraduationCap } from "lucide-react";

interface StudentAllCoursesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StudentAllCoursesPage({ searchParams }: StudentAllCoursesPageProps) {
  const resolvedParams = await searchParams;

  const queryParams = {
    searchTerm: resolvedParams.searchTerm as string | undefined,
    category: resolvedParams.category as string | undefined,
    difficulty: resolvedParams.difficulty as string | undefined,
    priceType: resolvedParams.priceType as string | undefined,
    sortBy: resolvedParams.sortBy as string | undefined,
    sortOrder: resolvedParams.sortOrder as "asc" | "desc" | undefined,
    page: resolvedParams.page as string | undefined,
    limit: resolvedParams.limit as string | undefined,
  };

  const response = await getAllCoursesAction(queryParams);
  const courses = response?.data || [];
  const meta = response?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <GraduationCap className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Browse All Courses</h1>
            <p className="text-muted-foreground text-sm font-medium mt-1">
              Find your next learning adventure and enroll today.
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-muted/30 p-4 md:p-6 rounded-3xl border border-muted/50 space-y-6">
          <div className="w-full sm:max-w-md">
            <CourseSearch />
          </div>
          <CourseFilters />
        </div>
      </div>

      {/* Grid */}
      <CourseGrid courses={courses} isLoading={false} />

      {/* Pagination */}
      <CoursePagination meta={meta} />
    </div>
  );
}
