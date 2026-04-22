import { getDraftCoursesAction } from "@/actions/instructor/course.action";
import DraftCourseFilter from "@/components/modules/instructor/course-drafts/DraftCourseFilter";
import DraftCourseList from "@/components/modules/instructor/course-drafts/DraftCourseList";

interface DraftsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DraftsPage({ searchParams }: DraftsPageProps) {
  const resolvedParams = await searchParams;
  
  const queryParams = {
    searchTerm: resolvedParams.searchTerm || "",
    difficulty: resolvedParams.difficulty || "",
    priceType: resolvedParams.priceType || "",
    page: resolvedParams.page || "1",
    limit: resolvedParams.limit || "10",
  };

  const response = await getDraftCoursesAction(queryParams);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Draft Courses</h1>
          <p className="text-muted-foreground mt-1">Manage and finalize your course content before publishing.</p>
        </div>
      </div>

      <DraftCourseFilter />

      <DraftCourseList 
        data={response?.data || []} 
        meta={response?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 }} 
      />
    </div>
  );
}
