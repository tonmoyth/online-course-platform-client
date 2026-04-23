"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lesson {
  id: string;
  title: string;
  content?: string;
  videoUrl?: string;
}

interface LessonContentProps {
  lesson: Lesson | null;
  isCompleted: boolean;
  onMarkComplete: (id: string) => void;
}

export default function LessonContent({
  lesson,
  isCompleted,
  onMarkComplete,
}: LessonContentProps) {
  if (!lesson) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground p-8 text-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">No lesson selected</h2>
          <p>Please select a lesson from the sidebar to start learning.</p>
        </div>
      </div>
    );
  }

  // Extract YouTube ID if it's a YouTube URL
  let youtubeId = null;
  if (lesson.videoUrl) {
    const match = lesson.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    if (match && match[1]) {
      youtubeId = match[1];
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Header & Title */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <h1 className="text-3xl font-black tracking-tight">{lesson.title}</h1>
          <Button
            onClick={() => onMarkComplete(lesson.id)}
            variant={isCompleted ? "secondary" : "default"}
            className="shrink-0 gap-2 font-bold"
          >
            {isCompleted ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                Completed
              </>
            ) : (
              "Mark as Complete"
            )}
          </Button>
        </div>

        {/* Video Player */}
        {lesson.videoUrl && (
          <div className="w-full bg-black rounded-2xl overflow-hidden aspect-video shadow-lg">
            {youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                title={lesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={lesson.videoUrl}
                controls
                className="w-full h-full object-contain"
                controlsList="nodownload"
              />
            )}
          </div>
        )}

        {/* Text Content */}
        {lesson.content && (
          <div className="prose prose-neutral dark:prose-invert max-w-none bg-card p-6 md:p-8 rounded-2xl border">
            {/* Simple HTML rendering, in production you'd use a safe HTML parser or markdown renderer */}
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </div>
        )}

      </div>
    </div>
  );
}
