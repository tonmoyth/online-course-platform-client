"use client";

import { useState } from "react";
import LessonCard from "./LessonCard";
import {
  reorderLessonsAction,
  deleteLessonAction,
} from "@/actions/instructor/lesson.action";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BookOpen, Loader2 } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  orderIndex: number;
  isFreePreview: boolean;
  videoUrl?: string | null;
  fileUrl?: string | null;
  content?: string;
}

interface LessonListProps {
  courseId: string;
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
}

export default function LessonList({
  courseId,
  lessons,
  onEdit,
}: LessonListProps) {
  const [localLessons, setLocalLessons] = useState<Lesson[]>(lessons);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Keep local state in sync with server-side props after revalidation
  if (JSON.stringify(lessons) !== JSON.stringify(localLessons)) {
    setLocalLessons(lessons);
  }

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await deleteLessonAction(deleteId, courseId);
      if (res.success) {
        toast.success("Lesson removed successfully");
        setLocalLessons((prev) => prev.filter((l) => l.id !== deleteId));
      } else {
        toast.error(res.message ?? "Failed to delete lesson");
      }
    } catch {
      toast.error("Network error: Failed to delete lesson");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleMove = async (id: string, direction: "UP" | "DOWN") => {
    const index = localLessons.findIndex((l) => l.id === id);
    if (
      (direction === "UP" && index === 0) ||
      (direction === "DOWN" && index === localLessons.length - 1)
    )
      return;

    const updated = [...localLessons];
    const swapIndex = direction === "UP" ? index - 1 : index + 1;
    [updated[index], updated[swapIndex]] = [updated[swapIndex], updated[index]];

    const withNewOrder: Lesson[] = updated.map((l, i) => ({
      ...l,
      orderIndex: i,
    }));

    // Optimistic UI update
    setLocalLessons(withNewOrder);

    try {
      const payload = withNewOrder.map((l) => ({
        id: l.id,
        orderIndex: l.orderIndex,
      }));
      const res = await reorderLessonsAction(courseId, payload);
      if (!res.success) {
        toast.error("Reorder failed — reverting changes");
        setLocalLessons(lessons);
      }
    } catch {
      toast.error("Reorder failed — check your connection");
      setLocalLessons(lessons);
    }
  };

  if (localLessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl bg-muted/5 border-muted-foreground/20">
        <div className="bg-muted p-4 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-muted-foreground/40" />
        </div>
        <p className="text-muted-foreground font-semibold">
          Your curriculum is empty
        </p>
        <p className="text-muted-foreground/60 text-sm mt-1">
          Add your first lesson to get started.
        </p>
      </div>
    );
  }

  const sorted = [...localLessons].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="space-y-4">
      {sorted.map((lesson, index) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          onEdit={onEdit}
          onDelete={(id) => setDeleteId(id)}
          onMoveUp={(id) => handleMove(id, "UP")}
          onMoveDown={(id) => handleMove(id, "DOWN")}
          isFirst={index === 0}
          isLast={index === sorted.length - 1}
        />
      ))}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => !isDeleting && setDeleteId(null)}
      >
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              Delete Lesson?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This will permanently remove &quot;
              <span className="font-semibold text-foreground">
                {localLessons.find((l) => l.id === deleteId)?.title}
              </span>
              &quot; from your course. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4">
            <AlertDialogCancel
              disabled={isDeleting}
              className="rounded-full"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Confirm Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
