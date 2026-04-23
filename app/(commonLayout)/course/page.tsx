import { getAllCoursesAction } from "@/actions/course.action";
import CourseGrid from "@/components/modules/course/CourseGrid";
import CourseFilters from "@/components/modules/course/CourseFilters";
import CourseSearch from "@/components/modules/course/CourseSearch";
import CoursePagination from "@/components/modules/course/CoursePagination";
import { BookOpen } from "lucide-react";

interface CoursePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CoursePage({ searchParams }: CoursePageProps) {
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
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-10 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Explore Courses</h1>
            <p className="text-muted-foreground text-lg mt-2 max-w-2xl">
              Discover top-quality courses taught by industry experts. Find what you need to level up your skills today.
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
