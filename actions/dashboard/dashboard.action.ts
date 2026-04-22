"use server";

import { getDashboardStats } from "@/services/dashboard/dashboard.service";

export const getDashboardStatsAction = async () => {
  try {
    return await getDashboardStats();
  } catch (error) {
    console.error("Dashboard Stats Action Error:", error);
    return null;
  }
};
