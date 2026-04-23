"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Users, RefreshCw, Trophy } from "lucide-react";
import { toast } from "sonner";
import { getQuizAttempts } from "@/services/quiz.service";
import type { QuizAttempt } from "./types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ScoreBadge({ score }: { score: number }) {
  const colorClass =
    score >= 80
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
      : score >= 50
      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300"
      : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${colorClass}`}
    >
      <Trophy className="h-3 w-3" />
      {score}%
    </span>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function AttemptsSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-10 rounded-xl bg-muted" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-14 rounded-xl bg-muted/60" />
      ))}
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface QuizAttemptsProps {
  quizId: string;
  isActive: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

export default function QuizAttempts({ quizId, isActive }: QuizAttemptsProps) {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [page, setPage] = useState(1);

  const fetchAttempts = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await getQuizAttempts(quizId);
      if (res.success) {
        setAttempts(res.data ?? []);
      } else {
        toast.error("Failed to load attempts");
      }
    } catch {
      toast.error("Network error while loading attempts");
    } finally {
      setIsFetching(false);
      setHasFetched(true);
    }
  }, [quizId]);

  // Lazy load — only fetch when the tab becomes active
  useEffect(() => {
    if (isActive && !hasFetched) {
      fetchAttempts();
    }
  }, [isActive, hasFetched, fetchAttempts]);

  const totalPages = Math.ceil(attempts.length / PAGE_SIZE);
  const paginated = attempts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="font-bold text-base">Student Attempts</span>
          {attempts.length > 0 && (
            <Badge variant="outline" className="font-mono text-xs">
              {attempts.length} total
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setHasFetched(false);
            setPage(1);
            fetchAttempts();
          }}
          disabled={isFetching}
          className="gap-1.5 rounded-full text-xs"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Content */}
      {isFetching ? (
        <AttemptsSkeleton />
      ) : attempts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-2xl bg-muted/5 border-muted-foreground/20">
          <div className="bg-muted p-4 rounded-full mb-3">
            <Users className="h-7 w-7 text-muted-foreground/40" />
          </div>
          <p className="font-semibold text-muted-foreground">No attempts yet</p>
          <p className="text-sm text-muted-foreground/60 mt-1">
            Students haven&apos;t taken this quiz yet.
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="font-black text-foreground">Student</TableHead>
                  <TableHead className="font-black text-foreground">Email</TableHead>
                  <TableHead className="font-black text-foreground text-center">Score</TableHead>
                  <TableHead className="font-black text-foreground">Started At</TableHead>
                  <TableHead className="font-black text-foreground">Submitted At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((attempt) => (
                  <TableRow
                    key={attempt.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <TableCell className="font-semibold">
                      {attempt.student.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {attempt.student.email}
                    </TableCell>
                    <TableCell className="text-center">
                      <ScoreBadge score={attempt.score} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(attempt.startedAt)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(attempt.submittedAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
