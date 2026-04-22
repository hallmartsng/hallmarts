const API_URL = process.env["API_BASE_URL"];

export async function getHomepageFeed() {
  const res = await fetch(`${API_URL}/store/products`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch homepage feed");
  }

  return res.json();
}
