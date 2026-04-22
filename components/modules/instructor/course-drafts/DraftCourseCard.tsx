"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { 
  BookOpen, 
  Layers, 
  Tag 
} from "lucide-react";
import Image from "next/image";
import CourseActionButtons from "./actions/CourseActionButtons";

interface DraftCourseCardProps {
  course: any;
}

export default function DraftCourseCard({ course }: DraftCourseCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow border-muted">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full bg-muted">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <BookOpen className="h-12 w-12 opacity-20" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-bold uppercase text-[10px]">
            {course.status}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px] font-semibold uppercase">
            {course.category}
          </Badge>
        </div>
        <h3 className="font-bold text-lg line-clamp-1 leading-tight">{course.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {course.description || "No description provided for this draft."}
        </p>
      </CardHeader>

      <CardContent className="px-4 py-2 flex flex-wrap gap-3 mt-auto">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Layers className="h-3.5 w-3.5" />
          <span>{course.difficulty}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Tag className="h-3.5 w-3.5" />
          <span className={course.priceType === "FREE" ? "text-green-600 font-bold" : ""}>
            {course.priceType === "FREE" ? "FREE" : `$${course.price}`}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-4 border-t">
        <CourseActionButtons course={course} />
      </CardFooter>
    </Card>
  );
}
