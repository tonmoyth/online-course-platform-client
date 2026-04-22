"use server";

import { getRoles, createRole } from "@/services/admin/role.service";

export const getRolesAction = async () => {
  return await getRoles();
};

export const createRoleAction = async (data: any) => {
  console.log("🚀 ~ createRoleAction ~ data:", data)
  const res = await createRole(data);

  if (!res.success) {
    throw new Error(res.message || "Failed to create role");
  }

  return res;
};


