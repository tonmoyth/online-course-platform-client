import { getDashboardStatsAction } from "@/actions/dashboard/dashboard.action";
import InstructorDashboard from "@/components/modules/dashboard/InstructorDashboard";

export default async function InstructorDashboardPage() {
  const data = await getDashboardStatsAction();
  console.log("DATA", data);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1>
      <InstructorDashboard data={data} />
    </div>
  );
}
