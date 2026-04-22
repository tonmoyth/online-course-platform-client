import { getDashboardStatsAction } from "@/actions/dashboard/dashboard.action";
import StudentDashboard from "@/components/modules/dashboard/StudentDashboard";

export default async function StudentDashboardPage() {
  const data = await getDashboardStatsAction();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      <StudentDashboard data={data} />
    </div>
  );
}
