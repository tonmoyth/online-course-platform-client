"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import DraftCourseCard from "./DraftCourseCard";
import { BookOpen } from "lucide-react";

interface DraftCourseListProps {
  data: any[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function DraftCourseList({ data, meta }: DraftCourseListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > meta.totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed border-muted">
        <BookOpen className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
        <h3 className="text-xl font-bold">No draft courses found</h3>
        <p className="text-muted-foreground mt-2">Start by creating a new course to see it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((course) => (
          <DraftCourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="pt-8 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(meta.page - 1)}
                  className={`cursor-pointer ${meta.page <= 1 ? "pointer-events-none opacity-50" : ""}`}
                />
              </PaginationItem>
              
              {[...Array(meta.totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => handlePageChange(i + 1)}
                    isActive={meta.page === i + 1}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(meta.page + 1)}
                  className={`cursor-pointer ${meta.page >= meta.totalPages ? "pointer-events-none opacity-50" : ""}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
