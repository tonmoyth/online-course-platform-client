"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { rejectCourseAction } from "@/actions/admin/course.action";
import { Loader2 } from "lucide-react";

interface RejectCourseModalProps {
  courseId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RejectCourseModal({
  courseId,
  isOpen,
  onClose,
}: RejectCourseModalProps) {
  const router = useRouter();
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    if (!courseId) return;
    if (!remark.trim()) {
      toast.error("Please provide a remark for rejection");
      return;
    }

    setLoading(true);
    try {
      await rejectCourseAction(courseId, remark);
      toast.success("Course rejected successfully");
      router.refresh();
      onClose();
      setRemark("");
    } catch (error: any) {
      toast.error(error.message || "Failed to reject course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reject Course</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this course. The instructor will see this remark.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="remark">Remark</Label>
            <Textarea
              id="remark"
              placeholder="Enter rejection reason..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reject Course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
