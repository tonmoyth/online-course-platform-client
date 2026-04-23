"use client";

import { useState } from "react";
import { Plus, ListTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LessonList from "./LessonList";
import LessonFormModal from "./LessonFormModal";
import AddQuizButton from "./AddQuizButton";

interface Lesson {
  id: string;
  title: string;
  orderIndex: number;
  isFreePreview: boolean;
  videoUrl?: string | null;
  fileUrl?: string | null;
  content?: string;
}

interface LessonManagerProps {
  courseId: string;
  initialLessons: Lesson[];
}

export default function LessonManager({
  courseId,
  initialLessons,
}: LessonManagerProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const handleAddLesson = () => {
    setEditingLesson(null);
    setIsFormOpen(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingLesson(null);
  };

  return (
    <Card className="border-none shadow-xl bg-background/60 backdrop-blur-sm rounded-[2rem] overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-8 py-8 border-b bg-muted/20">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-2xl text-primary ring-4 ring-primary/5">
              <ListTree className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-black tracking-tight">
                Course Curriculum
              </CardTitle>
              <CardDescription className="text-base font-medium">
                Structure your course with lessons and quizzes.
              </CardDescription>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AddQuizButton courseId={courseId} />

          <Button
            onClick={handleAddLesson}
            className="flex items-center gap-2 h-12 px-6 rounded-2xl shadow-lg shadow-primary/20 font-bold transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Add Lesson
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-8 py-8">
        <LessonList
          courseId={courseId}
          lessons={initialLessons}
          onEdit={handleEditLesson}
        />
      </CardContent>

      <LessonFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        courseId={courseId}
        lesson={editingLesson}
      />
    </Card>
  );
}
