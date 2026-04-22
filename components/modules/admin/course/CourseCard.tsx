"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Users, BookOpen, GraduationCap, DollarSign } from "lucide-react";
import CourseActions from "./CourseActions";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    category: { name: string };
    difficulty: string;
    price: number;
    status: string;
    instructor: { name: string };
    _count: { enrollments: number };
  };
  onRejectTrigger: (id: string) => void;
}

export default function CourseCard({ course, onRejectTrigger }: CourseCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>;
      case "PENDING":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      case "DRAFT":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Beginner</Badge>;
      case "Intermediate":
        return <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">Intermediate</Badge>;
      case "Advanced":
        return <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50">Advanced</Badge>;
      default:
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {course.category?.name || "Uncategorized"}
          </Badge>
          {getStatusBadge(course.status)}
        </div>
        <CardTitle className="text-lg line-clamp-2 min-h-[3.5rem]">
          {course.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <GraduationCap className="h-4 w-4" />
          {getDifficultyBadge(course.difficulty)}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>{course.instructor?.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{course._count?.enrollments || 0} Students</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <DollarSign className="h-4 w-4" />
          <span>{course.price === 0 ? "Free" : `$${course.price}`}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t mt-auto">
        <div className="flex items-center justify-between w-full mt-4">
          <CourseActions 
            course={course} 
            onRejectTrigger={() => onRejectTrigger(course.id)} 
          />
        </div>
      </CardFooter>
    </Card>
  );
}
