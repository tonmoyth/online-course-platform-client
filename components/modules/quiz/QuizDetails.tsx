"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ClipboardList,
  Clock,
  Target,
  RefreshCw,
  Users,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { getQuizDetailsAction } from "@/actions/quiz.action";
import { addQuestionAction } from "@/actions/quiz.action";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

import type { Quiz, Question, QuestionOption } from "./types";
import QuizAttempts from "./QuizAttempts";

// ─── Props ────────────────────────────────────────────────────────────────────

interface QuizDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  quizId: string;
  courseId: string;
  initialQuiz?: Quiz | null;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/40 border text-sm">
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <span className="text-muted-foreground font-medium">{label}:</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function QuizDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 w-28 rounded-xl bg-muted" />
        ))}
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-2xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

// ─── View Tabs ────────────────────────────────────────────────────────────────

type Tab = "questions" | "attempts";

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuizDetails({
  isOpen,
  onClose,
  quizId,
  courseId,
  initialQuiz,
}: QuizDetailsProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(initialQuiz ?? null);
  const [questions, setQuestions] = useState<Question[]>(
    initialQuiz?.questions ?? []
  );
  const [isFetching, setIsFetching] = useState(!initialQuiz);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("questions");

  const fetchQuiz = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await getQuizDetailsAction(quizId);
      if (res.success) {
        setQuiz(res.data as Quiz);
        setQuestions((res.data as Quiz).questions ?? []);
      } else {
        toast.error("Failed to load quiz details");
      }
    } catch {
      toast.error("Network error while loading quiz");
    } finally {
      setIsFetching(false);
    }
  }, [quizId]);

  useEffect(() => {
    if (isOpen && !initialQuiz) {
      fetchQuiz();
    }
  }, [isOpen, initialQuiz, fetchQuiz]);

  const handleAddQuestion = async (values: {
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: QuestionOption;
  }) => {
    setIsAddingQuestion(true);
    try {
      const payload = {
        ...values,
        orderIndex: questions.length,
      };
      const res = await addQuestionAction(quizId, courseId, payload);
      if (res.success) {
        toast.success("Question added successfully!");
        setQuestions((prev) => [...prev, res.data as Question]);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to add question");
    } finally {
      setIsAddingQuestion(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[780px] max-h-[90vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black">
                {quiz?.title ?? "Quiz Details"}
              </DialogTitle>
              <DialogDescription>
                Manage questions and view student attempts.
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-full h-8 w-8"
              onClick={fetchQuiz}
              disabled={isFetching}
              aria-label="Refresh quiz"
            >
              <RefreshCw
                className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
              />
            </Button>
          </div>

          {/* Quiz Stats */}
          {quiz && (
            <div className="flex flex-wrap gap-2 pt-2">
              <StatChip
                icon={Target}
                label="Passing Score"
                value={`${quiz.passingScore}%`}
              />
              <StatChip
                icon={Clock}
                label="Time Limit"
                value={
                  quiz.timeLimitMinutes
                    ? `${quiz.timeLimitMinutes} min`
                    : "Unlimited"
                }
              />
              <StatChip
                icon={RefreshCw}
                label="Max Attempts"
                value={quiz.maxAttempts ? String(quiz.maxAttempts) : "Unlimited"}
              />
              <StatChip
                icon={ClipboardList}
                label="Questions"
                value={String(questions.length)}
              />
            </div>
          )}
        </DialogHeader>

        <Separator className="my-1" />

        {/* Tab Nav */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl">
          <button
            onClick={() => setActiveTab("questions")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "questions"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <ClipboardList className="h-4 w-4" />
            Questions
            {questions.length > 0 && (
              <Badge className="h-4 text-[10px] px-1.5 py-0 bg-primary/15 text-primary hover:bg-primary/15">
                {questions.length}
              </Badge>
            )}
          </button>
          <button
            onClick={() => setActiveTab("attempts")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "attempts"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Users className="h-4 w-4" />
            Student Attempts
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Content */}
        {isFetching ? (
          <QuizDetailsSkeleton />
        ) : (
          <div className="space-y-6 pt-2">
            {activeTab === "questions" && (
              <>
                {/* Add Question Form */}
                <QuestionForm
                  isSubmitting={isAddingQuestion}
                  editingQuestion={null}
                  onSubmit={handleAddQuestion}
                />

                {/* Question List */}
                <QuestionList
                  quizId={quizId}
                  courseId={courseId}
                  questions={questions}
                  onQuestionsChange={setQuestions}
                />
              </>
            )}

            {activeTab === "attempts" && (
              <QuizAttempts quizId={quizId} isActive={activeTab === "attempts"} />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
