"use client";

import { CheckCircle2, PlayCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  isCompleted?: boolean;
  // If the backend has locked lessons logic, we could use a field like isLocked
}

interface LessonSidebarProps {
  lessons: Lesson[];
  activeLessonId: string | null;
  completedLessonIds: string[];
  onSelectLesson: (id: string) => void;
}

export default function LessonSidebar({
  lessons,
  activeLessonId,
  completedLessonIds,
  onSelectLesson,
}: LessonSidebarProps) {
  return (
    <div className="h-full flex flex-col bg-card border-r">
      <div className="p-6 border-b">
        <h2 className="font-bold text-lg tracking-tight">Course Content</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {completedLessonIds.length} of {lessons.length} lessons completed
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {lessons.map((lesson, index) => {
          const isActive = lesson.id === activeLessonId;
          const isCompleted = completedLessonIds.includes(lesson.id);

          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className={cn(
                "w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all group",
                isActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"
              )}
            >
              <div className="mt-0.5 shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : isActive ? (
                  <PlayCircle className="h-5 w-5 text-primary" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                    {index + 1}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className={cn("text-sm font-medium leading-tight", isActive && "font-bold")}>
                  {lesson.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
