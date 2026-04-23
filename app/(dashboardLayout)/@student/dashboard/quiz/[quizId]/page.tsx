import { getQuizQuestionsAction } from "@/actions/quizAttempt.actions";
import QuizAttemptPage from "@/components/modules/student/quiz/QuizAttemptPage";
import { notFound } from "next/navigation";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface QuizPageProps {
  params: Promise<{ quizId: string }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { quizId } = await params;
  
  const response = await getQuizQuestionsAction(quizId);

  if (!response.success || !response.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="h-20 w-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Quiz Unavailable</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          {response.message || "We couldn't load the questions for this quiz. Please try again later."}
        </p>
        <Link href="/dashboard/my-learning">
          <Button size="lg" className="rounded-xl">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  // Assuming response.data is an array of questions or an object containing questions
  const questions = Array.isArray(response.data) ? response.data : response.data.questions || [];
  const timeLimitMinutes = response.data.timeLimitMinutes || 15;

  return (
    <div className="min-h-screen bg-background/50">
      <QuizAttemptPage
        quizId={quizId}
        questions={questions}
        timeLimitMinutes={timeLimitMinutes}
      />
    </div>
  );
}
