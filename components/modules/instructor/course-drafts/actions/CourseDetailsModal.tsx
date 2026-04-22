"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getCourseStudentsAction } from "@/actions/instructor/course.action";
import { Loader2, Users } from "lucide-react";

interface CourseDetailsModalProps {
  course: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseDetailsModal({ course, isOpen, onClose }: CourseDetailsModalProps) {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
    }
  }, [isOpen]);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const res = await getCourseStudentsAction(course.id);
      if (res.success) {
        setStudents(res.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch students", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <DialogTitle>Enrolled Students</DialogTitle>
          </div>
          <DialogDescription>
            View all students enrolled in <strong>{course.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground font-medium">Fetching students list...</p>
            </div>
          ) : students.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student: any, index: number) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-muted-foreground">{student.email}</TableCell>
                    <TableCell>
                      {new Date(student.enrollmentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={student.status === "ACTIVE" ? "default" : "secondary"}>
                        {student.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
              <Users className="h-12 w-12 opacity-10 mb-2" />
              <p className="text-sm font-medium">No students enrolled yet.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
