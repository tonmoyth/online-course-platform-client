"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Eye,
  Send,
  Trash2,
  Loader2
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { submitCourseAction, deleteCourseAction } from "@/actions/instructor/course.action";
import { toast } from "sonner";
import EditCourseModal from "./EditCourseModal";
import CourseDetailsModal from "./CourseDetailsModal";
import Link from "next/link";

interface CourseActionButtonsProps {
  course: any;
}

export default function CourseActionButtons({ course }: CourseActionButtonsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const res = await submitCourseAction(course.id);
      console.log("Submit Response:", res);
      if (res.success) {
        toast.success("Course submitted for review!");
      } else {
        toast.error(res.message || "Failed to submit course");
      }
    } catch (error) {
      toast.error("An error occurred during submission");
    } finally {
      setIsProcessing(false);
      setIsSubmitConfirmOpen(false);
    }
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      const res = await deleteCourseAction(course.id);
      console.log("Delete Result:", res);
      if (res.success) {
        toast.success("Course deleted successfully");
      } else {
        toast.error(res.message || "Failed to delete course");
      }
    } catch (error) {
      toast.error("An error occurred during deletion");
    } finally {
      setIsProcessing(false);
      setIsDeleteConfirmOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {/* Action Buttons */}
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 h-9 text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
        onClick={() => setIsEditOpen(true)}
        disabled={isProcessing}
      >
        <Edit className="h-3.5 w-3.5" />
        Edit
      </Button>


      <Link href={`/dashboard/manage-course/${course.id}`} className="w-full">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 h-9 w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          disabled={isProcessing}
        >
          <Eye className="h-3.5 w-3.5" />
          Manage
        </Button>
      </Link>

      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 h-9 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
        onClick={() => setIsSubmitConfirmOpen(true)}
        disabled={isProcessing}
      >
        {isProcessing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
        Submit
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 h-9 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
        onClick={() => setIsDeleteConfirmOpen(true)}
        disabled={isProcessing}
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </Button>

      {/* Modals & Dialogs */}
      <EditCourseModal
        course={course}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      <CourseDetailsModal
        course={course}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      {/* Submit Confirmation */}
      <AlertDialog open={isSubmitConfirmOpen} onOpenChange={setIsSubmitConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will submit your course for administrative review. You won't be able to edit it until the review is complete.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
              disabled={isProcessing}
            >
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Yes, Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the draft of <strong>{course.title}</strong> and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isProcessing}
            >
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Permanently Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
