"use client";

import { Users, BookOpen, GraduationCap, Trophy, AlertCircle } from "lucide-react";
import SummaryCard from "./SummaryCard";
import RecentActivity from "./RecentActivity";

interface AdminDashboardProps {
  data: {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    totalQuizAttempts: number;
    pendingApprovals: {
      users: number;
      courses: number;
    };
    recentActivity: {
      newUsers: any[];
      newCourses: any[];
    };
  };
}

export default function AdminDashboard({ data }: AdminDashboardProps) {
  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Users"
          value={data.totalUsers}
          icon={Users}
          description="Total registered users"
        />
        <SummaryCard
          title="Total Courses"
          value={data.totalCourses}
          icon={BookOpen}
          description="Courses on platform"
        />
        <SummaryCard
          title="Total Enrollments"
          value={data.totalEnrollments}
          icon={GraduationCap}
          description="Overall student enrollments"
        />
        <SummaryCard
          title="Total Quiz Attempts"
          value={data.totalQuizAttempts}
          icon={Trophy}
          description="Completed assessments"
        />
      </div>

      {(data?.pendingApprovals?.users > 0 || data?.pendingApprovals?.courses > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
           <SummaryCard
            title="Pending Users"
            value={data?.pendingApprovals?.users ?? 0}
            icon={AlertCircle}
            className="border-amber-200 bg-amber-50"
            description="Users awaiting approval"
          />
           <SummaryCard
            title="Pending Courses"
            value={data?.pendingApprovals?.courses ?? 0}
            icon={AlertCircle}
            className="border-amber-200 bg-amber-50"
            description="Courses awaiting approval"
          />
        </div>
      )}

      <RecentActivity data={data.recentActivity} />
    </div>
  );
}
