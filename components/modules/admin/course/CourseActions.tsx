"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  EyeOff,
  Trash2,
  Loader2,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  approveCourseAction,
  unpublishCourseAction,
  deleteCourseAction,
} from "@/actions/admin/course.action";

interface CourseActionsProps {
  course: {
    id: string;
    status: string;
  };
  onRejectTrigger: () => void;
}

export default function CourseActions({
  course,
  onRejectTrigger,
}: CourseActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (
    actionName: string,
    actionFn: (id: string) => Promise<any>
  ) => {
    setLoading(actionName);
    try {
      await actionFn(course.id);
      toast.success(`Course ${actionName}ed successfully`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || `Failed to ${actionName} course`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {course.status === "PENDING" && (
        <>
          <Button
            size="sm"
            variant="outline"
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
            onClick={() => handleAction("approve", approveCourseAction)}
            disabled={!!loading}
          >
            {loading === "approve" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4 mr-1" />
            )}
            Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onRejectTrigger}
            disabled={!!loading}
          >
            <X className="h-4 w-4 mr-1" />
            Reject
          </Button>
        </>
      )}

      {course.status === "PUBLISHED" && (
        <Button
          size="sm"
          variant="outline"
          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
          onClick={() => handleAction("unpublish", unpublishCourseAction)}
          disabled={!!loading}
        >
          {loading === "unpublish" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <EyeOff className="h-4 w-4 mr-1" />
          )}
          Unpublish
        </Button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={() => {
              if (confirm("Are you sure you want to delete this course?")) {
                handleAction("delete", deleteCourseAction);
              }
            }}
            disabled={!!loading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Course
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
