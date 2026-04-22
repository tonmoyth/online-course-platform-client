"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface RecentActivityProps {
  data: {
    newUsers: any[];
    newCourses: any[];
  };
}

export default function RecentActivity({ data }: RecentActivityProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Recent Courses</CardTitle>
          <CardDescription>
            Latest courses added to the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {data?.newCourses?.map((course) => (
              <div key={course.id} className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {course.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Status: {course.status}
                  </p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(course.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            ))}
            {data?.newCourses?.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No recent courses.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>New Users</CardTitle>
          <CardDescription>Latest platform registrations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {data?.newUsers?.map((user) => (
              <div key={user.id} className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            ))}
            {data?.newUsers?.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No new users.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
