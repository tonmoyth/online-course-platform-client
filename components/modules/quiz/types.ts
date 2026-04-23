// ─── Quiz Types ───────────────────────────────────────────────────────────────

export type QuestionOption = "A" | "B" | "C" | "D";

export interface Question {
  id: string;
  quizId: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: QuestionOption;
  orderIndex: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  timeLimitMinutes?: number | null;
  passingScore: number;
  maxAttempts?: number | null;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

// ─── Attempt Types ────────────────────────────────────────────────────────────

export interface QuizAttempt {
  id: string;
  quizId: string;
  score: number;
  startedAt: string;
  submittedAt: string | null;
  student: {
    id: string;
    name: string;
    email: string;
  };
}
