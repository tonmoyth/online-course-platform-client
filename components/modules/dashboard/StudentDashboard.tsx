"use client";

import { BookOpen, Trophy, Clock, CheckCircle2, XCircle } from "lucide-react";
import SummaryCard from "./SummaryCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


interface StudentDashboardProps {
  data: {
    enrolledCourses: any[];
    recentQuizzes: any[];
    lastAccessedCourse: { title: string } | null;
  };
}

export default function StudentDashboard({ data }: StudentDashboardProps) {
  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Enrolled Courses"
          value={data.enrolledCourses.length}
          icon={BookOpen}
        />
        <SummaryCard
          title="Completed Quizzes"
          value={data.recentQuizzes.filter((q) => q.isPassed).length}
          icon={Trophy}
        />
        <SummaryCard
          title="Active Learning"
          value={data.lastAccessedCourse?.title || "No recent activity"}
          icon={Clock}
          description="Last accessed course"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your learning journey so far.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.enrolledCourses.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{course.title}</span>
                  <span className="text-muted-foreground">{course.progressPercent}%</span>
                </div>
                <Progress value={course.progressPercent} className="h-2" />
              </div>
            ))}
            {data.enrolledCourses.length === 0 && (
              <p className="text-center py-4 text-muted-foreground">
                You are not enrolled in any courses yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Quiz Results</CardTitle>
            <CardDescription>Your latest assessment performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {quiz.isPassed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{quiz.quizTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        Score: {quiz.score}%
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${quiz.isPassed
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                      }`}
                  >
                    {quiz.isPassed ? "Passed" : "Failed"}
                  </span>
                </div>
              ))}
              {data.recentQuizzes.length === 0 && (
                <p className="text-center py-4 text-muted-foreground">
                  No quizzes attempted yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
