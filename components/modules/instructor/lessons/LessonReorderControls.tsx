"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LessonReorderControlsProps {
  lessonId: string;
  isFirst: boolean;
  isLast: boolean;
  orderIndex: number;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export default function LessonReorderControls({
  lessonId,
  isFirst,
  isLast,
  orderIndex,
  onMoveUp,
  onMoveDown,
}: LessonReorderControlsProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Move lesson up"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={() => onMoveUp(lessonId)}
        disabled={isFirst}
      >
        <ChevronUp className="h-5 w-5" />
      </Button>

      <div className="bg-muted px-2 py-0.5 rounded text-[11px] font-bold text-muted-foreground select-none">
        {String(orderIndex + 1).padStart(2, "0")}
      </div>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Move lesson down"
        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={() => onMoveDown(lessonId)}
        disabled={isLast}
      >
        <ChevronDown className="h-5 w-5" />
      </Button>
    </div>
  );
}
