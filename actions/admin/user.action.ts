"use server";

import { approveUser, assignUserRole, getUsers, rejectUser, updateUser } from "@/services/admin/user.service";
import { revalidatePath } from "next/cache";


export const getUsersAction = async (query: Record<string, any>) => {
  return await getUsers(query);
};

export const approveUserAction = async (id: string) => {
  const res = await approveUser(id);

  if (!res.success) throw new Error(res.message || "Failed to approve user");

  revalidatePath("/admin/dashboard/user-management");
  return res;
};

export const rejectUserAction = async (id: string, remark: string) => {
  const res = await rejectUser(id, remark);

  if (!res.success) throw new Error(res.message || "Failed to reject user");

  revalidatePath("/admin/dashboard/user-management");
  return res;
};

export const updateUserAction = async (id: string, data: any) => {
  const res = await updateUser(id, data);

  if (!res.success) {
    throw new Error(res.message || "Failed to update user");
  }

  revalidatePath("/admin/dashboard/user-management");
  return res;
};

export const assignRoleAction = async (userId: string, roleId: string) => {
  const res = await assignUserRole(userId, roleId);

  if (!res.success) {
    throw new Error(res.message || "Failed to assign role");
  }

  revalidatePath("/admin/dashboard/user-management");
  return res;
};
