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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createLessonAction, updateLessonAction } from "@/actions/instructor/lesson.action";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const lessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  videoUrl: z.string().optional().or(z.literal("")),
  fileUrl: z.string().optional().or(z.literal("")),
  isFreePreview: z.boolean().default(false),
  orderIndex: z.coerce.number().min(0).optional(),
});

type LessonFormValues = z.infer<typeof lessonSchema>;

interface LessonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  lesson?: any;
}

export default function LessonFormModal({ isOpen, onClose, courseId, lesson }: LessonFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      content: "",
      videoUrl: "",
      fileUrl: "",
      isFreePreview: false,
      orderIndex: 0,
    },
  });

  useEffect(() => {
    if (lesson) {
      form.reset({
        title: lesson.title || "",
        content: lesson.content || "",
        videoUrl: lesson.videoUrl || "",
        fileUrl: lesson.fileUrl || "",
        isFreePreview: !!lesson.isFreePreview,
        orderIndex: Number(lesson.orderIndex) || 0,
      });
    } else {
      form.reset({
        title: "",
        content: "",
        videoUrl: "",
        fileUrl: "",
        isFreePreview: false,
        orderIndex: 0,
      });
    }
  }, [lesson, form, isOpen]);

  const onSubmit = async (values: LessonFormValues) => {
    setIsSubmitting(true);
    try {
      let res;
      if (lesson) {
        res = await updateLessonAction(lesson.id, values, courseId);
      } else {
        res = await createLessonAction(courseId, values);
      }

      if (res.success) {
        toast.success(lesson ? "Lesson updated" : "Lesson created");
        onClose();
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{lesson ? "Edit Lesson" : "Add New Lesson"}</DialogTitle>
          <DialogDescription>
            {lesson ? "Modify the lesson details below." : "Create a new lesson for this course curriculum."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Mastering React Hooks" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Content (Markdown)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Write your lesson content here..." className="min-h-[150px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="YouTube/Vimeo link" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resources Link (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Link to PDF/Slides" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isFreePreview"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-muted/5">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="cursor-pointer">Enable Free Preview</FormLabel>
                    <FormDescription>
                      Allow non-enrolled students to view this lesson.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Lesson"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
