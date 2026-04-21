import { getRolesAction } from "@/actions/admin/role.action";
import RegisterForm from "@/components/modules/auth/RegisterForm";

export default async function RegisterPage() {
  const rolesRes = await getRolesAction();
  // Assuming the backend returns { success: true, data: roles[] }
  const roles = rolesRes?.data || [];

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <RegisterForm roles={roles} />
    </div>
  );
}