"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Pencil, Trash2, Loader2, BookOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import QuestionForm from "./QuestionForm";
import {
  updateQuestionAction,
  deleteQuestionAction,
} from "@/actions/quiz.action";
import { toast } from "sonner";
import type { Question, QuestionOption } from "./types";

// ─── Option Color Map ─────────────────────────────────────────────────────────

const OPTION_COLORS: Record<QuestionOption, string> = {
  A: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-300",
  B: "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950/30 dark:border-purple-800 dark:text-purple-300",
  C: "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950/30 dark:border-orange-800 dark:text-orange-300",
  D: "bg-pink-50 border-pink-200 text-pink-800 dark:bg-pink-950/30 dark:border-pink-800 dark:text-pink-300",
};

const CORRECT_STYLE =
  "ring-2 ring-emerald-400 bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-300";

// ─── Props ────────────────────────────────────────────────────────────────────

interface QuestionListProps {
  quizId: string;
  courseId: string;
  questions: Question[];
  onQuestionsChange: (questions: Question[]) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuestionList({
  quizId,
  courseId,
  questions,
  onQuestionsChange,
}: QuestionListProps) {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const questionToDelete = questions.find((q) => q.id === deleteId);

  const handleUpdate = async (values: {
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: QuestionOption;
  }) => {
    if (!editingQuestion) return;
    setIsUpdating(true);
    try {
      const res = await updateQuestionAction(
        editingQuestion.id,
        courseId,
        values
      );
      if (res.success) {
        toast.success("Question updated successfully");
        const updated = questions.map((q) =>
          q.id === editingQuestion.id ? { ...q, ...values } : q
        );
        onQuestionsChange(updated);
        setEditingQuestion(null);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to update question");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await deleteQuestionAction(deleteId, courseId);
      if (res.success) {
        toast.success("Question deleted");
        onQuestionsChange(questions.filter((q) => q.id !== deleteId));
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to delete question");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-2xl bg-muted/5 border-muted-foreground/20">
        <div className="bg-muted p-4 rounded-full mb-3">
          <BookOpen className="h-7 w-7 text-muted-foreground/40" />
        </div>
        <p className="font-semibold text-muted-foreground">No questions yet</p>
        <p className="text-sm text-muted-foreground/60 mt-1">
          Use the form above to add your first question.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {questions.length} Question{questions.length !== 1 ? "s" : ""}
      </p>

      {questions
        .slice()
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((question, index) => {
          const isEditing = editingQuestion?.id === question.id;

          return (
            <div key={question.id}>
              {isEditing ? (
                <QuestionForm
                  isSubmitting={isUpdating}
                  editingQuestion={editingQuestion}
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingQuestion(null)}
                />
              ) : (
                <div className="group rounded-2xl border bg-card p-5 hover:shadow-md hover:border-primary/20 transition-all duration-200">
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-black">
                        {index + 1}
                      </span>
                      <p className="font-semibold text-base leading-snug pt-0.5">
                        {question.questionText}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            aria-label="Edit question"
                            className="h-8 w-8 text-primary bg-primary/5 hover:bg-primary/15 border-none"
                            onClick={() => setEditingQuestion(question)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Question</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            aria-label="Delete question"
                            className="h-8 w-8 text-red-600 bg-red-50 hover:bg-red-100 border-none dark:bg-red-950/30 dark:hover:bg-red-950/50"
                            onClick={() => setDeleteId(question.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Question</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(["A", "B", "C", "D"] as QuestionOption[]).map((opt) => {
                      const optKey = `option${opt}` as keyof Question;
                      const isCorrect = question.correctOption === opt;
                      return (
                        <div
                          key={opt}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            isCorrect
                              ? CORRECT_STYLE
                              : OPTION_COLORS[opt]
                          }`}
                        >
                          <span className="shrink-0 font-black text-xs w-5 h-5 flex items-center justify-center rounded-full bg-white/60 dark:bg-black/20">
                            {opt}
                          </span>
                          <span className="truncate">
                            {String(question[optKey])}
                          </span>
                          {isCorrect && (
                            <Badge className="ml-auto shrink-0 bg-emerald-500 text-white text-[10px] px-1.5 py-0 h-4 hover:bg-emerald-500">
                              ✓ Correct
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={() => !isDeleting && setDeleteId(null)}
      >
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              Delete Question?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This will permanently remove &quot;
              <span className="font-semibold text-foreground">
                {questionToDelete?.questionText}
              </span>
              &quot; from the quiz. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4">
            <AlertDialogCancel disabled={isDeleting} className="rounded-full">
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
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
