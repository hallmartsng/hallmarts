import StoreProductDetails from "@/components/store/StoreProductDetailsPage/StoreProductDetails";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const productId = params.slug.split("-").pop();

  return (
    <section className="flex items-center flex-col w-full gap-6 sm:pt-0 pt-10 ms:px-0 px-4">
      <div className="sm:w-[1230px] mx-auto w-full gap-5 flex flex-col items-start justify-start">
        <StoreProductDetails productId={productId || ""} />
      </div>
    </section>
  );
}
