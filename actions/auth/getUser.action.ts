"use server";

import { getUserInfo } from "@/services/auth/auth.service";

export const getUserAction = async () => {
  try {
    const user = await getUserInfo();
    return user;
  } catch (error) {
    console.error("Get User Action Error:", error);
    return null;
  }
};
