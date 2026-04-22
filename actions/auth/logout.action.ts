"use server";

import { logoutUser } from "@/services/auth/auth.service";
import { deleteCookie } from "@/lib/cookie";

export const logoutAction = async () => {
  const res = await logoutUser();

  if (!res?.success) {
    throw new Error(res?.message || "Logout failed");
  }

  // Clear all cookies
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
  await deleteCookie("sessionToken");

  return res;
};
