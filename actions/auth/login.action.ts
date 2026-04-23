"use server";

import { loginUser } from "@/services/auth/auth.service";
import { setAuthCookies } from "@/lib/token";

export const loginAction = async (data: any) => {



  const res = await loginUser(data);

  if (!res.success) {
    throw new Error(res.message || "Login failed");
  }

  // Set cookies
  await setAuthCookies(res);

  return res.data.user;
};
