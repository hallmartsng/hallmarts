const API_URL = process.env["API_BASE_URL"];

export async function getHomepageFeed(campusId: string) {
  const res = await fetch(`${API_URL}/store/product`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch homepage feed");
  }

  return res.json();
}
