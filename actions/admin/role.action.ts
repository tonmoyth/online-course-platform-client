"use server";

import { getRoles } from "@/services/admin/role.service";

export const getRolesAction = async () => {
  return await getRoles();
};
