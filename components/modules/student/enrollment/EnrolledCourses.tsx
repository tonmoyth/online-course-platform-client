"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, User, Calendar, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import ProgressBar from "./ProgressBar";
import QuizStartButton from "../quiz/QuizStartButton";

interface EnrolledCourse {
  id: string;
  courseId: string;
  progressPercent: number;
  enrolledAt: string;
  course: {
    id: string;
    title: string;
    thumbnailUrl?: string;
    quizzes?: { id: string }[];
    instructor?: {
      name?: string;
      image?: string;
    };
  };
}

interface EnrolledCoursesProps {
  enrollments: EnrolledCourse[];
}

export default function EnrolledCourses({ enrollments }: EnrolledCoursesProps) {
  if (!enrollments || enrollments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-muted/10 rounded-3xl border border-dashed">
        <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <BookOpen className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold mb-2">No courses yet</h3>
        <p className="text-muted-foreground max-w-md mb-8">
          You haven't enrolled in any courses yet. Start exploring our catalog to begin your learning journey!
        </p>
        <Link href="/course">
          <Button size="lg" className="rounded-full font-bold px-8">
            Browse Courses
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enrollments.map((enrollment) => (
        <Card key={enrollment.id} className="group overflow-hidden rounded-2xl border-none shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-card">
          {/* Thumbnail */}
          <div className="relative aspect-video w-full overflow-hidden bg-muted/20">
            {enrollment.course?.thumbnailUrl ? (
              <Image
                src={enrollment.course.thumbnailUrl}
                alt={enrollment.course.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized={true}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <BookOpen className="h-12 w-12 text-muted-foreground/30" />
              </div>
            )}

            {/* Hover overlay play button */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
            </div>
          </div>

          <CardHeader className="p-5 pb-2">
            <h3 className="text-xl font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {enrollment.course?.title}
            </h3>
          </CardHeader>

          <CardContent className="p-5 pt-0 flex-grow space-y-5">
            {/* Instructor Info */}
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-full overflow-hidden bg-muted border shrink-0">
                {enrollment.course?.instructor?.image ? (
                  <Image
                    src={enrollment.course.instructor.image}
                    alt={enrollment.course.instructor.name || "Instructor"}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium leading-tight">
                  {enrollment.course?.instructor?.name || "Unknown Instructor"}
                </p>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="pt-2">
              <ProgressBar progressPercent={enrollment.progressPercent || 0} />
            </div>
          </CardContent>

          <CardFooter className="p-5 pt-0 mt-auto flex flex-col gap-3">
            <Link href={`/dashboard/learn/${enrollment.courseId}`} className="w-full">
              <Button className="w-full rounded-xl font-bold shadow-sm group-hover:shadow-md transition-all gap-2">
                Continue Learning
              </Button>
            </Link>
            {enrollment.course?.quizzes && enrollment.course.quizzes.length > 0 && (
              <QuizStartButton quizId={enrollment.course.quizzes[0].id} />
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
