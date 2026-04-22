import { cookies } from "next/headers";

export const getDashboardStats = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value
  const session = cookieStore.get("sessionToken")?.value

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`, {
    headers: {
      "Content-Type": "application/json",
      cookie: `accessToken=${accessToken}; sessionToken=${session}`,
    },
    next: {
      revalidate: 60, // Cache for 1 minute
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch dashboard stats: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();
  return result.data;
};
