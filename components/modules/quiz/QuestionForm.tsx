"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Pencil } from "lucide-react";
import type { Question, QuestionOption } from "./types";

// ─── Schema ───────────────────────────────────────────────────────────────────

const questionSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  correctOption: z.enum(["A", "B", "C", "D"], {
    message: "Please select the correct answer",
  }),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

// ─── Props ────────────────────────────────────────────────────────────────────

interface QuestionFormProps {
  isSubmitting: boolean;
  editingQuestion?: Question | null;
  onSubmit: (values: QuestionFormValues) => Promise<void>;
  onCancel?: () => void;
}

// ─── Option Labels ────────────────────────────────────────────────────────────

const OPTION_LABELS: { key: keyof QuestionFormValues; label: string }[] = [
  { key: "optionA", label: "Option A" },
  { key: "optionB", label: "Option B" },
  { key: "optionC", label: "Option C" },
  { key: "optionD", label: "Option D" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuestionForm({
  isSubmitting,
  editingQuestion,
  onSubmit,
  onCancel,
}: QuestionFormProps) {
  const isEditing = !!editingQuestion;

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      questionText: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: undefined,
    },
  });

  // Pre-fill when editing
  useEffect(() => {
    if (editingQuestion) {
      form.reset({
        questionText: editingQuestion.questionText,
        optionA: editingQuestion.optionA,
        optionB: editingQuestion.optionB,
        optionC: editingQuestion.optionC,
        optionD: editingQuestion.optionD,
        correctOption: editingQuestion.correctOption as QuestionOption,
      });
    } else {
      form.reset({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: undefined,
      });
    }
  }, [editingQuestion, form]);

  return (
    <div className="rounded-2xl border bg-muted/20 p-6 space-y-5">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
          {isEditing ? (
            <Pencil className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </div>
        <h3 className="font-bold text-base">
          {isEditing ? "Edit Question" : "Add New Question"}
        </h3>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          id="question-form"
        >
          {/* Question Text */}
          <FormField
            control={form.control}
            name="questionText"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Question</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your question here..."
                    className="rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OPTION_LABELS.map(({ key, label }) => (
              <FormField
                key={key}
                control={form.control}
                name={key as keyof QuestionFormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-sm">
                      {label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={`Enter ${label.toLowerCase()}...`}
                        className="rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Correct Answer */}
          <FormField
            control={form.control}
            name="correctOption"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Correct Answer</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-xl w-full">
                      <SelectValue placeholder="Select the correct option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(["A", "B", "C", "D"] as QuestionOption[]).map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        Option {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full shadow-md shadow-primary/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Saving..." : "Adding..."}
                </>
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Add Question"
              )}
            </Button>

            {isEditing && onCancel && (
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                disabled={isSubmitting}
                className="rounded-full"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
