"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Play, Loader2 } from "lucide-react";
import { startAttemptAction } from "@/actions/quizAttempt.actions";

interface QuizStartButtonProps {
  quizId: string;
}

export default function QuizStartButton({ quizId }: QuizStartButtonProps) {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = async () => {
    setIsStarting(true);
    try {
      const res = await startAttemptAction(quizId);

      if (res.success) {
        toast.success("Quiz started! Good luck.");
        router.push(`/dashboard/quiz/${quizId}`);
      } else {
        // Max attempts logic handles here
        toast.error(res.message || "Failed to start the quiz.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <Button
      onClick={handleStart}
      disabled={isStarting}
      className="w-full gap-2 rounded-xl shadow-sm hover:shadow-md transition-all font-bold"
    >
      {isStarting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Starting...
        </>
      ) : (
        <>
          <Play className="h-4 w-4" />
          Start Quiz
        </>
      )}
    </Button>
  );
}
