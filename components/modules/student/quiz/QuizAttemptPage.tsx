"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionCard from "./QuestionCard";
import QuizTimer from "./QuizTimer";
import { submitAttemptAction } from "@/actions/quizAttempt.actions";

interface Question {
  id: string;
  questionText: string;
  options: string[];
}

interface QuizAttemptPageProps {
  quizId: string;
  questions: Question[];
  timeLimitMinutes?: number;
}

export default function QuizAttemptPage({
  quizId,
  questions,
  timeLimitMinutes = 15,
}: QuizAttemptPageProps) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  
  // Calculate answered count
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const isAllAnswered = answeredCount === questions.length;

  const handleSelectOption = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }));

    try {
      const res = await submitAttemptAction(quizId, formattedAnswers);
      if (res.success) {
        toast.success("Quiz submitted successfully!");
        // The API returns the attemptId in the data block
        const attemptId = res.data?.id;
        if (attemptId) {
          router.push(`/dashboard/quiz/result/${attemptId}`);
        } else {
          // Fallback if attemptId is not returned
          router.push(`/dashboard/my-learning`);
        }
      } else {
        toast.error(res.message || "Failed to submit quiz.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-2">No questions found</h2>
        <p className="text-muted-foreground mb-6">This quiz currently has no questions.</p>
        <Button onClick={() => router.push("/dashboard/my-learning")}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header / Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-2xl border shadow-sm sticky top-4 z-10">
        <div className="flex items-center gap-3">
          {/* Progress indicators dots */}
          <div className="flex gap-1.5 hidden md:flex">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  answers[q.id]
                    ? "bg-green-500"
                    : i === currentIndex
                    ? "bg-primary ring-2 ring-primary/30"
                    : "bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>
          <p className="text-sm font-medium text-muted-foreground md:ml-4">
            <span className="text-foreground font-bold">{answeredCount}</span> / {questions.length} Answered
          </p>
        </div>

        <QuizTimer timeLimitMinutes={timeLimitMinutes} onTimeUp={handleSubmit} />
      </div>

      {/* Main Question Area */}
      <div className="min-h-[400px]">
        <QuestionCard
          question={currentQuestion}
          selectedOption={answers[currentQuestion.id] || null}
          onSelectOption={handleSelectOption}
          index={currentIndex}
          total={questions.length}
        />
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrev}
          disabled={currentIndex === 0 || isSubmitting}
          className="rounded-xl font-bold"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`rounded-xl font-bold shadow-lg ${
              isAllAnswered ? "bg-green-500 hover:bg-green-600 shadow-green-500/20" : ""
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-5 w-5" />
            )}
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </Button>
        ) : (
          <Button
            size="lg"
            onClick={handleNext}
            disabled={isSubmitting}
            className="rounded-xl font-bold"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
