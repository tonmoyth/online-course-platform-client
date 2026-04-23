"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Video, FileText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LessonReorderControls from "./LessonReorderControls";

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    orderIndex: number;
    isFreePreview: boolean;
    videoUrl?: string | null;
    fileUrl?: string | null;
    content?: string;
  };
  onEdit: (lesson: LessonCardProps["lesson"]) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function LessonCard({
  lesson,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: LessonCardProps) {
  return (
    <div className="group flex items-center gap-4 p-5 bg-card border rounded-2xl hover:shadow-md hover:border-primary/20 transition-all duration-200">
      {/* Reorder Controls */}
      <LessonReorderControls
        lessonId={lesson.id}
        isFirst={isFirst}
        isLast={isLast}
        orderIndex={lesson.orderIndex}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />

      {/* Lesson Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <h4 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
            {lesson.title}
          </h4>
          {lesson.isFreePreview ? (
            <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-none px-2 py-0 h-5 text-[10px] font-bold shrink-0">
              FREE PREVIEW
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-muted-foreground/60 px-2 py-0 h-5 text-[10px] font-bold shrink-0"
            >
              LOCKED
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {lesson.videoUrl ? (
              <span className="flex items-center gap-1 text-blue-600 font-semibold">
                <Video className="h-3.5 w-3.5" />
                Video Lesson
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                Text Content
              </span>
            )}
          </div>

          {lesson.fileUrl && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-600">
              <div className="h-1 w-1 rounded-full bg-orange-400" />
              Resource File
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons — visible on hover */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Edit lesson"
              className="h-10 w-10 text-primary bg-primary/5 hover:bg-primary/10 border-none"
              onClick={() => onEdit(lesson)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit Lesson</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Delete lesson"
              className="h-10 w-10 text-red-600 bg-red-50 hover:bg-red-100 border-none dark:bg-red-950/30 dark:hover:bg-red-950/50"
              onClick={() => onDelete(lesson.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Lesson</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
