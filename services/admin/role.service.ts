export const getRoles = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/roles`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return { success: false, data: [] };
  }

  return res.json();
};
