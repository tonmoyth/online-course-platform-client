"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, User, Star, Tag, BarChart } from "lucide-react";
import { Course } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {

  const [imgError, setImgError] = useState(false);
  const [instructorImgError, setInstructorImgError] = useState(false);

  const isFree = course.priceType === "FREE" || Number(course.price) === 0;

  return (
    <Card className="group overflow-hidden rounded-2xl border-none shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-card">
      <div className="relative aspect-video w-full overflow-hidden bg-muted/20">
        {course.thumbnailUrl && !imgError ? (
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={true}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <BookOpen className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className="bg-background/80 backdrop-blur-md text-foreground hover:bg-background/90 border-none font-semibold">
            {course.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex flex-wrap gap-2">
          {isFree ? (
            <Badge className="bg-emerald-500/90 text-white backdrop-blur-md border-none font-bold">
              FREE
            </Badge>
          ) : (
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md border-none font-bold">
              ${course.price}
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="p-5 pb-2">
        <h3 className="text-xl font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {course.title}
        </h3>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-grow space-y-4">
        {/* Instructor Info */}
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 rounded-full overflow-hidden bg-muted border shrink-0">
            {course.instructor?.image && !instructorImgError ? (
              <Image
                src={course.instructor.image}
                alt={course.instructor.name || "Instructor"}
                fill
                className="object-cover"
                unoptimized={true}
                onError={() => setInstructorImgError(true)}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            {course.instructor?.name || "Unknown Instructor"}
          </p>
        </div>

        {/* Metadata Row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BarChart className="h-4 w-4 text-primary/70" />
            <span className="font-medium">{course.difficulty}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto">
        <Link href={`/course/${course.id}`} className="w-full">
          <Button className="w-full rounded-xl font-bold shadow-sm group-hover:shadow-md transition-all">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
