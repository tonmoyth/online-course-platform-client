import { getCoursesAction } from "@/actions/admin/course.action";
import CourseList from "@/components/modules/admin/course/CourseList";

interface SearchParams {
  searchTerm?: string;
  status?: string;
  difficulty?: string;
  priceType?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

export default async function AdminCourseOversightPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const data = await getCoursesAction(params);


  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Course Oversight</h1>
        <p className="text-gray-500">
          Manage and review all courses on the platform.
        </p>
      </div>

      <CourseList data={data} />
    </div>
  );
}
