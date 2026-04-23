"use client";

import { useState } from "react";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import QuizModal from "@/components/modules/quiz/QuizModal";
import QuizDetails from "@/components/modules/quiz/QuizDetails";
import type { Quiz } from "@/components/modules/quiz/types";

interface AddQuizButtonProps {
  courseId: string;
}

export default function AddQuizButton({ courseId }: AddQuizButtonProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createdQuiz, setCreatedQuiz] = useState<Quiz | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleQuizCreated = (quiz: Quiz) => {
    setCreatedQuiz(quiz);
    setIsCreateOpen(false);
    // Automatically open quiz details to add questions immediately
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 h-12 px-6 rounded-2xl border-primary/20 hover:border-primary/50 text-primary bg-primary/5 font-bold transition-all hover:scale-105 active:scale-95"
          >
            <Brain className="h-5 w-5" />
            Add Quiz
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          Create an interactive quiz for this course
        </TooltipContent>
      </Tooltip>

      {/* Step 1 — Create Quiz */}
      <QuizModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        courseId={courseId}
        onQuizCreated={handleQuizCreated}
      />

      {/* Step 2 — Manage Questions (auto-opens after creation) */}
      {createdQuiz && (
        <QuizDetails
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setCreatedQuiz(null);
          }}
          quizId={createdQuiz.id}
          courseId={courseId}
          initialQuiz={createdQuiz}
        />
      )}
    </>
  );
}
