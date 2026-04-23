import { getAttemptResultAction } from "@/actions/quizAttempt.actions";
import QuizResult from "@/components/modules/student/quiz/QuizResult";
import { notFound } from "next/navigation";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface QuizResultPageProps {
  params: Promise<{ attemptId: string }>;
}

export default async function QuizResultPage({ params }: QuizResultPageProps) {
  const { attemptId } = await params;
  
  const response = await getAttemptResultAction(attemptId);

  if (!response.success || !response.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="h-20 w-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Result Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          {response.message || "We couldn't load the result for this attempt."}
        </p>
        <Link href="/dashboard/my-learning">
          <Button size="lg" className="rounded-xl">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <QuizResult result={response.data} />
    </div>
  );
}
