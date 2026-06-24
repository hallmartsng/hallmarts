import StoreCategory from "@/components/store/StorecategoryPage/StoreCategory";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function StoreSearchPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <section className="flex items-center flex-col gap-6 sm:pt-0 pt-8 w-full px-2">
      <StoreCategory slug={decodeURIComponent(slug)} />
    </section>
  );
}
