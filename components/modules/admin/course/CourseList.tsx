"use client";

import { useState, useEffect, useCallback } from "react";
import CourseCard from "./CourseCard";
import RejectCourseModal from "./RejectCourseModal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, FilterX } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";


interface CourseListProps {
  data: {
    data: any[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export default function CourseList({ data }: CourseListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [rejectingCourseId, setRejectingCourseId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const updateQueryParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "ALL") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Always reset to page 1 on filter/search change
    if (!updates.page) {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (debouncedSearchTerm !== (searchParams.get("searchTerm") || "")) {
      updateQueryParams({ searchTerm: debouncedSearchTerm || null });
    }
  }, [debouncedSearchTerm, searchParams, updateQueryParams]);

  // Sync local search term with URL (e.g. on clear filters)
  useEffect(() => {
    setSearchTerm(searchParams.get("searchTerm") || "");
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage.toString() });
  };

  const clearFilters = () => {
    setSearchTerm("");
    router.push(pathname);
  };

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Select
            value={searchParams.get("status") || "ALL"}
            onValueChange={(v) => updateQueryParams({ status: v })}
          >
            <SelectTrigger className="w-[130px] bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={searchParams.get("difficulty") || "ALL"}
            onValueChange={(v) => updateQueryParams({ difficulty: v })}
          >
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={searchParams.get("priceType") || "ALL"}
            onValueChange={(v) => updateQueryParams({ priceType: v })}
          >
            <SelectTrigger className="w-[120px] bg-white">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Prices</SelectItem>
              <SelectItem value="FREE">Free</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={clearFilters} title="Clear Filters" className="hover:bg-gray-200">
            <FilterX className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Course Grid */}
      {data?.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.data.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onRejectTrigger={(id) => setRejectingCourseId(id)}
            />
          ))}
        </div>
      ) : (
        <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed rounded-xl border-gray-200 bg-white">
          <div className="p-4 bg-gray-50 rounded-full mb-4">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">No courses found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
          <Button variant="link" onClick={clearFilters} className="mt-2 text-primary">
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {data?.meta?.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500">
            Showing {data.data.length} of {data.meta.total} courses
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={data.meta.page <= 1}
              onClick={() => handlePageChange(data.meta.page - 1)}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: data.meta.totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={data.meta.page === p ? "default" : "ghost"}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={data.meta.page >= data.meta.totalPages}
              onClick={() => handlePageChange(data.meta.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <RejectCourseModal
        courseId={rejectingCourseId}
        isOpen={!!rejectingCourseId}
        onClose={() => setRejectingCourseId(null)}
      />
    </div>
  );
}
