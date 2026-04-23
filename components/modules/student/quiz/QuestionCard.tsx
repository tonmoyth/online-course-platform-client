"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface Option {
  id: string; // the option value itself (e.g. "A", "B", "C", "D") or the option text
  text: string;
}

interface Question {
  id: string;
  questionText: string;
  options: string[]; // assuming options are just strings based on generic quiz APIs
}

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  index: number;
  total: number;
}

export default function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
  index,
  total,
}: QuestionCardProps) {
  // Using generic A, B, C, D map if options are array of strings
  const labels = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="w-full bg-card rounded-2xl shadow-sm border p-6 md:p-10 space-y-8">
      {/* Question Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-lg text-sm">
            Question {index + 1} of {total}
          </div>
        </div>
        <h2 className="text-2xl font-semibold leading-relaxed">
          {question.questionText}
        </h2>
      </div>

      {/* Options Grid */}
      <div className="space-y-3">
        {question.options.map((optionText, i) => {
          const isSelected = selectedOption === optionText;
          const label = labels[i] || `${i + 1}`;

          return (
            <button
              key={i}
              onClick={() => onSelectOption(optionText)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 group",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                  : "border-muted hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center h-10 w-10 shrink-0 rounded-lg border-2 font-bold transition-colors",
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground group-hover:border-primary/50 group-hover:text-primary/70"
                )}
              >
                {isSelected ? <CheckCircle2 className="h-5 w-5" /> : label}
              </div>
              <p
                className={cn(
                  "flex-1 text-base font-medium",
                  isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                {optionText}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
