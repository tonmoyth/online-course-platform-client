"use client";

import { BookOpen, Users, Star } from "lucide-react";
import SummaryCard from "./SummaryCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InstructorDashboardProps {
  data: {
    totalCourses: number;
    totalStudents: number;
    averageQuizScore: number;
    courses: {
      title: string;
      status: string;
      enrolledStudents: number;
    }[];
  };
}

export default function InstructorDashboard({ data }: InstructorDashboardProps) {
  if (!data) return <div className="flex items-center justify-center h-48">Loading stats...</div>;

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "PUBLISHED":
        return <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>;
      case "DRAFT":
        return <Badge variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-300">Draft</Badge>;
      case "PENDING":
      case "PENDING REVIEW":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Pending Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total Courses Created"
          value={data.totalCourses}
          icon={BookOpen}
          description="Your educational catalog"
        />
        <SummaryCard
          title="Total Enrolled Students"
          value={data.totalStudents}
          icon={Users}
          description="Total reach across courses"
        />
        <SummaryCard
          title="Average Quiz Score"
          value={`${data.averageQuizScore}%`}
          icon={Star}
          description="Student performance indicator"
        />
      </div>

      {/* Course List Section */}
      <Card className="border-none shadow-sm">
        <CardHeader className="px-6 py-4 border-b">
          <CardTitle className="text-xl font-semibold">Your Courses Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[50%] px-6">Course Title</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right px-6">Enrolled Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.courses.map((course, index) => (
                <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium px-6 py-4">
                    {course.title}
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(course.status)}
                  </TableCell>
                  <TableCell className="text-right px-6 font-semibold">
                    {course.enrolledStudents}
                  </TableCell>
                </TableRow>
              ))}
              {data.courses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-12 text-muted-foreground">
                    You haven't created any courses yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
