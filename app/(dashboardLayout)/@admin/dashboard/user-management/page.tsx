import { getUsersAction } from "@/actions/admin/user.action";
import UserTable from "@/components/modules/admin/user/UserTable";
import UserFilters from "@/components/modules/admin/user/UserFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SearchParams {
  searchTerm?: string;
  page?: string;
  limit?: string;
  roleId?: string;
  status?: string;
}

import { getRolesAction } from "@/actions/admin/role.action";

export default async function UserManagementPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const data = await getUsersAction(params);
  const rolesData = await getRolesAction();
  const roles = rolesData?.data || [];

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <UserFilters roles={roles} />
          <UserTable data={data} roles={roles} />
        </CardContent>
      </Card>
    </div>
  );
}
