"use server";

import { registerUser } from "@/services/auth/auth.service";

export const registerAction = async (data: any) => {
  const res = await registerUser(data);

  if (!res.success) {
    throw new Error(res.message || "Registration failed");
  }

  return res;
};
