"use client";

import { useState, useEffect } from "react";
import LessonSidebar from "./LessonSidebar";
import LessonContent from "./LessonContent";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Lesson {
  id: string;
  title: string;
  content?: string;
  videoUrl?: string;
  isCompleted?: boolean;
}

interface CourseLearningData {
  id: string;
  title: string;
  lessons: Lesson[];
  progressPercent?: number; // From backend if available
}

interface LearningPageProps {
  course: CourseLearningData;
}

export default function LearningPage({ course }: LearningPageProps) {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(
    course.lessons.length > 0 ? course.lessons[0].id : null
  );

  // Initialize with lessons marked complete from backend (if any)
  const initialCompleted = course.lessons
    .filter((l) => l.isCompleted)
    .map((l) => l.id);
    
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(initialCompleted);

  // In a real app, this might be saved to the server. For now, it's UI only.
  const handleMarkComplete = (id: string) => {
    setCompletedLessonIds((prev) => {
      if (prev.includes(id)) {
        return prev; // Already complete
      }
      return [...prev, id];
    });
  };

  const activeLesson = course.lessons.find((l) => l.id === activeLessonId) || null;

  // Calculate dynamic progress
  const totalLessons = course.lessons.length;
  const progressPercent = totalLessons === 0 
    ? 0 
    : (completedLessonIds.length / totalLessons) * 100;

  return (
    <div className="fixed inset-0 z-50 flex flex-col h-screen bg-background overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 border-b bg-card shrink-0 px-4 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/my-learning">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-bold text-lg hidden sm:block line-clamp-1">
              {course.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full max-w-xs ml-auto">
          <ProgressBar progressPercent={progressPercent} />
          
          {/* Mobile Sidebar Toggle */}
          <div className="block lg:hidden ml-2 shrink-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-80">
                <LessonSidebar
                  lessons={course.lessons}
                  activeLessonId={activeLessonId}
                  completedLessonIds={completedLessonIds}
                  onSelectLesson={setActiveLessonId}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 shrink-0 border-r bg-card z-0">
          <LessonSidebar
            lessons={course.lessons}
            activeLessonId={activeLessonId}
            completedLessonIds={completedLessonIds}
            onSelectLesson={setActiveLessonId}
          />
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden bg-muted/10">
          <LessonContent
            lesson={activeLesson}
            isCompleted={activeLessonId ? completedLessonIds.includes(activeLessonId) : false}
            onMarkComplete={handleMarkComplete}
          />
        </main>
      </div>
    </div>
  );
}
