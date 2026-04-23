"use client";

import { PlayCircle, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface StudentDashboardProps {
  data: {
    enrolledCourses: {
      title: string;
      progressPercent: number;
    }[];
    recentQuizzes: {
      quizTitle: string;
      score: number;
      isPassed?: boolean;
    }[];
    lastAccessedCourse: { title: string } | null;
  };
}

export default function StudentDashboard({ data }: StudentDashboardProps) {
  if (!data) return <div className="flex items-center justify-center h-48">Loading your learning path...</div>;

  return (
    <div className="space-y-8">
      {/* Quick Resume Section */}
      {data.lastAccessedCourse && (
        <Card className="bg-primary/5 border-primary/20 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-primary mb-2">
              <PlayCircle className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Welcome Back</span>
            </div>
            <CardTitle className="text-2xl md:text-3xl">Continue Learning</CardTitle>
            <CardDescription className="text-lg font-medium text-foreground/80">
              {data.lastAccessedCourse.title}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/dashboard/my-learning">
              <Button size="lg" className="group">
                Learning
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Enrolled Courses Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Enrolled Courses</CardTitle>
            <CardDescription>Track your progress across all courses.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.enrolledCourses.map((course, index) => (
              <div key={index} className="space-y-3 p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm line-clamp-1">{course.title}</span>
                  <Badge variant="outline" className="font-bold">
                    {course.progressPercent}%
                  </Badge>
                </div>
                <Progress value={course.progressPercent} className="h-2" />
              </div>
            ))}
            {data.enrolledCourses.length === 0 && (
              <p className="text-center py-10 text-muted-foreground italic">
                You are not enrolled in any courses yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Quizzes Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Recent Quizzes</CardTitle>
            <CardDescription>Your latest assessment performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {quiz.isPassed ? (
                      <div className="p-2 bg-green-100 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="p-2 bg-red-100 rounded-full">
                        <XCircle className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold line-clamp-1">{quiz.quizTitle}</p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Score: <span className="text-foreground">{quiz.score}%</span>
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={quiz.isPassed
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {quiz.isPassed ? "Passed" : "Failed"}
                  </Badge>
                </div>
              ))}
              {data.recentQuizzes.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                  <p className="text-sm font-medium">No quizzes attempted yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
