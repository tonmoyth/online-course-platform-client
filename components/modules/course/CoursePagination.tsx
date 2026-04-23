"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginatedMeta } from "./types";

interface CoursePaginationProps {
  meta: PaginatedMeta;
}

export default function CoursePagination({ meta }: CoursePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > meta.totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    
    router.push(`${pathname}?${params.toString()}`);
  };

  if (meta.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(meta.page - 1)}
        disabled={meta.page <= 1}
        className="h-10 w-10 rounded-full"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <span className="text-sm font-medium text-muted-foreground">
        Page <span className="text-foreground">{meta.page}</span> of{" "}
        <span className="text-foreground">{meta.totalPages}</span>
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(meta.page + 1)}
        disabled={meta.page >= meta.totalPages}
        className="h-10 w-10 rounded-full"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
