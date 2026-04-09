export async function getHomepageFeed() {
  const res = await fetch(`${process.env["API_BASE_URL"]}/store/product`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch homepage feed");
  }

  return res.json();
}
