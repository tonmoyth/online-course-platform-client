"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CATEGORIES = [
  "Web Development",
  "Data Science",
  "Mobile Development",
  "Design",
  "Marketing",
  "Business",
];

export default function CourseFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    
    // Reset page to 1 when filters change
    params.set("page", "1");
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("difficulty");
    params.delete("priceType");
    params.delete("sortBy");
    params.delete("sortOrder");
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasActiveFilters = 
    searchParams.has("category") || 
    searchParams.has("difficulty") || 
    searchParams.has("priceType") || 
    searchParams.has("sortBy");

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Category Filter */}
      <Select
        value={searchParams.get("category") || "all"}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger className="w-[180px] h-12 rounded-xl bg-background border-muted-foreground/20">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Difficulty Filter */}
      <Select
        value={searchParams.get("difficulty") || "all"}
        onValueChange={(value) => handleFilterChange("difficulty", value)}
      >
        <SelectTrigger className="w-[150px] h-12 rounded-xl bg-background border-muted-foreground/20">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="all">Any Difficulty</SelectItem>
          <SelectItem value="Beginner">Beginner</SelectItem>
          <SelectItem value="Intermediate">Intermediate</SelectItem>
          <SelectItem value="Advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>

      {/* Price Filter */}
      <Select
        value={searchParams.get("priceType") || "all"}
        onValueChange={(value) => handleFilterChange("priceType", value)}
      >
        <SelectTrigger className="w-[130px] h-12 rounded-xl bg-background border-muted-foreground/20">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="all">Any Price</SelectItem>
          <SelectItem value="FREE">Free</SelectItem>
          <SelectItem value="PAID">Paid</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Filter */}
      <Select
        value={`${searchParams.get("sortBy") || "createdAt"}-${searchParams.get("sortOrder") || "desc"}`}
        onValueChange={(value) => {
          if (value === "all") return;
          const [sortBy, sortOrder] = value.split("-");
          const params = new URLSearchParams(searchParams.toString());
          params.set("sortBy", sortBy);
          params.set("sortOrder", sortOrder);
          params.set("page", "1");
          router.push(`${pathname}?${params.toString()}`);
        }}
      >
        <SelectTrigger className="w-[180px] h-12 rounded-xl bg-background border-muted-foreground/20">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="createdAt-desc">Newest First</SelectItem>
          <SelectItem value="createdAt-asc">Oldest First</SelectItem>
          <SelectItem value="title-asc">Title (A-Z)</SelectItem>
          <SelectItem value="title-desc">Title (Z-A)</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="h-12 rounded-xl text-muted-foreground hover:text-foreground px-4 flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
