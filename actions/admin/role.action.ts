"use server";

import { getRoles, createRole } from "@/services/admin/role.service";
import { revalidatePath } from "next/cache";

export const getRolesAction = async () => {
  return await getRoles();
};

export const createRoleAction = async (data: any) => {
  const res = await createRole(data);
  if (!res.success) throw new Error(res.message || "Failed to create role");
  revalidatePath("/admin/dashboard/roles");
  return res;
};
