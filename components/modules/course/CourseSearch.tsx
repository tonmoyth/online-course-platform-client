"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "./use-debounce";

export default function CourseSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("searchTerm") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Sync initial state if URL changes from outside
  useEffect(() => {
    setSearchTerm(searchParams.get("searchTerm") || "");
  }, [searchParams]);

  useEffect(() => {
    // Prevent routing if it hasn't actually changed from what's in the URL
    if (debouncedSearch === (searchParams.get("searchTerm") || "")) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    
    if (debouncedSearch) {
      params.set("searchTerm", debouncedSearch);
    } else {
      params.delete("searchTerm");
    }
    
    // Reset to page 1 on new search
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, pathname, router, searchParams]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 h-12 rounded-2xl border-muted-foreground/20 focus-visible:ring-primary shadow-sm"
      />
    </div>
  );
}
