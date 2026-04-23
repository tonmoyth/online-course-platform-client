"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizTimerProps {
  timeLimitMinutes: number;
  onTimeUp: () => void;
}

export default function QuizTimer({ timeLimitMinutes, onTimeUp }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(timeLimitMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isWarning = timeLeft < 60; // Less than 1 minute

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm font-mono font-bold tracking-tight",
        isWarning
          ? "border-destructive text-destructive bg-destructive/10 animate-pulse"
          : "border-primary/20 text-primary bg-primary/5"
      )}
    >
      <Clock className="h-4 w-4" />
      <span>
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
