"use client";

import { useState } from "react";
import Image from "next/image";
import { Course } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  User,
  BarChart,
  Calendar,
  CheckCircle2,
  Lock,
  PlayCircle,
} from "lucide-react";

interface CourseDetailsProps {
  course: Course;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  const [imgError, setImgError] = useState(false);
  const [instructorImgError, setInstructorImgError] = useState(false);

  const isFree = course.priceType === "FREE" || Number(course.price) === 0;
  const lessons = course.lessons || [];

  return (
    <div className="max-w-7xl mx-auto py-8 lg:py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Left: Main Content */}
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-semibold">
              {course.category}
            </Badge>
            <Badge variant="outline" className="font-semibold flex items-center gap-1.5">
              <BarChart className="h-3.5 w-3.5" />
              {course.difficulty}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted border shrink-0">
                {course.instructor?.image && !instructorImgError ? (
                  <Image
                    src={course.instructor.image}
                    alt={course.instructor.name || "Instructor"}
                    fill
                    className="object-cover"
                    onError={() => setInstructorImgError(true)}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Instructor</p>
                <p className="font-bold text-base">
                  {course.instructor?.name || "Unknown Instructor"}
                </p>
              </div>
            </div>
            
            <Separator orientation="vertical" className="h-10 hidden sm:block" />
            
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-muted/40 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Last Updated</p>
                <p className="font-bold text-base">
                  {new Date(course.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Floating Enrollment Card */}
        <div className="w-full lg:w-[400px] shrink-0">
          <Card className="rounded-3xl border-none shadow-2xl bg-card overflow-hidden sticky top-8">
            <div className="relative aspect-video w-full bg-muted">
              {course.thumbnailUrl && !imgError ? (
                <Image
                  src={course.thumbnailUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <BookOpen className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Course Price</p>
                  <h2 className="text-4xl font-black">
                    {isFree ? "Free" : `$${course.price}`}
                  </h2>
                </div>
              </div>

              <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Enroll Now
              </Button>

              <div className="space-y-4 pt-4">
                <h4 className="font-bold text-sm">This course includes:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>{lessons.length} comprehensive lessons</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Curriculum Section */}
      <div className="max-w-3xl space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Course Curriculum</h2>
          <p className="text-muted-foreground">
            {lessons.length} lessons • {isFree ? "Fully accessible" : "Preview available"}
          </p>
        </div>

        <div className="space-y-3">
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <div
                key={lesson.id || index}
                className="group flex items-center justify-between p-4 rounded-2xl border bg-card hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-base group-hover:text-primary transition-colors">
                      {lesson.title}
                    </h4>
                    {lesson.isFreePreview && (
                      <Badge variant="secondary" className="mt-1 text-[10px] px-1.5 py-0">
                        Preview Available
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground">
                  {isFree || lesson.isFreePreview ? (
                    <PlayCircle className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
                  ) : (
                    <Lock className="h-5 w-5 opacity-50" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center rounded-2xl border border-dashed bg-muted/10">
              <BookOpen className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No lessons available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
