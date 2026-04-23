import { CheckCircle, XCircle, AlertCircle, ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultAnswer {
  questionId: string;
  questionText: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
}

interface QuizResultProps {
  result: {
    id: string;
    score: number;
    passingScore: number;
    passed: boolean;
    totalQuestions: number;
    correctAnswers: number;
    answers?: ResultAnswer[]; // Optional if backend provides detailed breakdown
  };
  quizId?: string; // Optional, to navigate back to history or course
}

export default function QuizResult({ result, quizId }: QuizResultProps) {
  const isPass = result.passed;
  const scorePercent = Math.round((result.score / result.totalQuestions) * 100) || 0;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      {/* Top Banner */}
      <div
        className={cn(
          "flex flex-col items-center justify-center p-12 rounded-3xl text-center space-y-6 border shadow-lg relative overflow-hidden",
          isPass
            ? "bg-gradient-to-b from-green-500/10 to-green-500/5 border-green-500/20"
            : "bg-gradient-to-b from-destructive/10 to-destructive/5 border-destructive/20"
        )}
      >
        <div
          className={cn(
            "h-24 w-24 rounded-full flex items-center justify-center shadow-inner",
            isPass ? "bg-green-500/20 text-green-600" : "bg-destructive/20 text-destructive"
          )}
        >
          {isPass ? <Trophy className="h-12 w-12" /> : <AlertCircle className="h-12 w-12" />}
        </div>
        
        <div className="space-y-2 relative z-10">
          <h1 className="text-4xl font-black tracking-tight">
            {isPass ? "Congratulations!" : "Keep Trying!"}
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-md mx-auto">
            {isPass
              ? "You've successfully passed the quiz. Great job demonstrating your knowledge."
              : "You didn't reach the passing score this time. Review the material and try again."}
          </p>
        </div>

        {/* Big Score */}
        <div className="pt-4 flex items-baseline gap-2">
          <span className={cn("text-6xl font-black", isPass ? "text-green-600 dark:text-green-500" : "text-destructive")}>
            {scorePercent}%
          </span>
          <span className="text-xl text-muted-foreground font-bold">Score</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card shadow-sm border-none">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-1">
            <p className="text-muted-foreground font-medium">Total Questions</p>
            <p className="text-3xl font-bold">{result.totalQuestions}</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-sm border-none">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-1">
            <p className="text-muted-foreground font-medium">Correct Answers</p>
            <p className="text-3xl font-bold text-green-500">{result.correctAnswers}</p>
          </CardContent>
        </Card>
        <Card className="bg-card shadow-sm border-none">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-1">
            <p className="text-muted-foreground font-medium">Passing Score</p>
            <p className="text-3xl font-bold">{result.passingScore}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Answer Breakdown (if available) */}
      {result.answers && result.answers.length > 0 && (
        <div className="space-y-4 pt-8">
          <h3 className="text-2xl font-bold tracking-tight">Detailed Breakdown</h3>
          <div className="space-y-4">
            {result.answers.map((ans, idx) => (
              <div key={idx} className="p-6 bg-card border rounded-2xl space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {ans.isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="font-semibold text-lg">{ans.questionText}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                      <div className="p-3 rounded-xl bg-muted/50 border border-dashed">
                        <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Your Answer</p>
                        <p className={cn("font-medium", ans.isCorrect ? "text-green-600" : "text-destructive")}>
                          {ans.selectedOption}
                        </p>
                      </div>
                      {!ans.isCorrect && (
                        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                          <p className="text-xs text-green-700 dark:text-green-400 font-bold uppercase mb-1">Correct Answer</p>
                          <p className="font-medium text-green-700 dark:text-green-400">
                            {ans.correctOption}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex justify-center pt-8">
        <Link href="/dashboard/my-learning">
          <Button size="lg" className="rounded-xl font-bold gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
