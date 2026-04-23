"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createQuizAction } from "@/actions/quiz.action";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, ClipboardList } from "lucide-react";
import type { Quiz } from "./types";

// ─── Schema ───────────────────────────────────────────────────────────────────

const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  timeLimitMinutes: z.coerce
    .number()
    .int()
    .positive("Must be a positive number")
    .optional()
    .or(z.literal("")),
  passingScore: z.coerce.number().int().min(0).max(100).default(50),
  maxAttempts: z.coerce
    .number()
    .int()
    .positive("Must be a positive number")
    .optional()
    .or(z.literal("")),
});

type QuizFormValues = z.infer<typeof quizSchema>;

// ─── Props ────────────────────────────────────────────────────────────────────

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  onQuizCreated: (quiz: Quiz) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuizModal({
  isOpen,
  onClose,
  courseId,
  onQuizCreated,
}: QuizModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema) as any,
    defaultValues: {
      title: "",
      timeLimitMinutes: "",
      passingScore: 50,
      maxAttempts: "",
    },
  });

  const onSubmit = async (values: QuizFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: values.title,
        passingScore: values.passingScore,
        ...(values.timeLimitMinutes !== "" && values.timeLimitMinutes != null
          ? { timeLimitMinutes: Number(values.timeLimitMinutes) }
          : {}),
        ...(values.maxAttempts !== "" && values.maxAttempts != null
          ? { maxAttempts: Number(values.maxAttempts) }
          : {}),
      };

      const res = await createQuizAction(courseId, payload);

      if (res.success) {
        toast.success("Quiz created successfully!");
        form.reset();
        onQuizCreated(res.data as Quiz);
        onClose();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[520px] rounded-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <ClipboardList className="h-5 w-5" />
            </div>
            <DialogTitle className="text-xl font-black">
              Create New Quiz
            </DialogTitle>
          </div>
          <DialogDescription>
            Set up a quiz for this course. You can add questions after creating
            it.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-2"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Quiz Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Module 1 Assessment"
                      className="rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Passing Score + Time Limit */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="passingScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Passing Score (%)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        max={100}
                        placeholder="50"
                        className="rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeLimitMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Time Limit (min)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        placeholder="Optional"
                        className="rounded-xl"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Leave blank for unlimited
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Max Attempts */}
            <FormField
              control={form.control}
              name="maxAttempts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Max Attempts</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      placeholder="Optional — leave blank for unlimited"
                      className="rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[130px] rounded-full shadow-lg shadow-primary/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Quiz"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
