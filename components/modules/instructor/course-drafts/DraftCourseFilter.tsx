"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function DraftCourseFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "all");
  const [priceType, setPriceType] = useState(searchParams.get("priceType") || "all");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchTerm) {
      params.set("searchTerm", debouncedSearchTerm);
    } else {
      params.delete("searchTerm");
    }
    params.set("page", "1"); // Reset to page 1 on search
    router.push(`?${params.toString()}`);
  }, [debouncedSearchTerm]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);

    if (key === "difficulty") setDifficulty(value);
    if (key === "priceType") setPriceType(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-muted/30 p-4 rounded-xl border border-muted">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses by title or category..."
          className="pl-10 h-11 bg-background"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Difficulty Filter */}
      <div className="w-full md:w-48">
        <Select value={difficulty} onValueChange={(val) => handleFilterChange("difficulty", val)}>
          <SelectTrigger className="h-11 bg-background">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Type Filter */}
      <div className="w-full md:w-48">
        <Select value={priceType} onValueChange={(val) => handleFilterChange("priceType", val)}>
          <SelectTrigger className="h-11 bg-background">
            <SelectValue placeholder="Price Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="FREE">Free</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
