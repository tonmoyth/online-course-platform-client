import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Attempt {
  id: string;
  score: number;
  passingScore: number;
  passed: boolean;
  createdAt: string;
}

interface QuizHistoryProps {
  attempts: Attempt[];
}

export default function QuizHistory({ attempts }: QuizHistoryProps) {
  if (!attempts || attempts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold tracking-tight">Previous Attempts</h3>
      <div className="space-y-3">
        {attempts.map((attempt, index) => {
          const isPass = attempt.passed;
          
          return (
            <div
              key={attempt.id}
              className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
                    isPass
                      ? "border-green-500 bg-green-500/10 text-green-500"
                      : "border-destructive bg-destructive/10 text-destructive"
                  )}
                >
                  {isPass ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                </div>
                <div>
                  <h4 className="font-semibold">Attempt {attempts.length - index}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(attempt.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className={cn("text-xl font-bold", isPass ? "text-green-500" : "text-destructive")}>
                  {attempt.score}%
                </p>
                <p className="text-xs text-muted-foreground font-medium uppercase mt-0.5">
                  {isPass ? "Passed" : "Failed"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
