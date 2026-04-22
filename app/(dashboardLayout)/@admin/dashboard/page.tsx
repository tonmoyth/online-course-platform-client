import { getDashboardStatsAction } from "@/actions/dashboard/dashboard.action";
import AdminDashboard from "@/components/modules/dashboard/AdminDashboard";

export default async function AdminDashboardPage() {
  const data = await getDashboardStatsAction();

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Admin Overview</h1>
      <AdminDashboard data={data} />
    </div>
  );
}
