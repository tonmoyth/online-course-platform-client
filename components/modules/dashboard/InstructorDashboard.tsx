"use client";

import { BookOpen, Users, Star } from "lucide-react";
import SummaryCard from "./SummaryCard";
import EnrollmentChart from "./EnrollmentChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InstructorDashboardProps {
  data: {
    totalCourses: number;
    totalStudents: number;
    averageQuizScore: number;
    courses: any[];
  };
}

export default function InstructorDashboard({ data }: InstructorDashboardProps) {
  if (!data) return <div>Loading...</div>;

  const chartData = data.courses.map((c) => ({
    name: c.title.substring(0, 15) + (c.title.length > 15 ? "..." : ""),
    students: c.enrolledStudents,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total Courses"
          value={data.totalCourses}
          icon={BookOpen}
          description="Courses you manage"
        />
        <SummaryCard
          title="Total Students"
          value={data.totalStudents}
          icon={Users}
          description="Enrolled in your courses"
        />
        <SummaryCard
          title="Avg. Quiz Score"
          value={`${data.averageQuizScore}%`}
          icon={Star}
          description="Performance across quizzes"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <EnrollmentChart data={chartData} />
        
        <Card>
          <CardHeader>
            <CardTitle>Your Courses Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.courses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{course.title}</p>
                    <div className="flex gap-2">
                      <Badge variant={course.status === "PUBLISHED" ? "default" : "outline"}>
                        {course.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{course.enrolledStudents}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                </div>
              ))}
              {data.courses.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">
                  You haven't created any courses yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
