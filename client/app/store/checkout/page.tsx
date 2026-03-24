import StoreCheckout from "@/components/store/StoreCheckoutPage/StoreCheckout";

export default function StoreCartPage() {
  return (
    <section className="flex items-center flex-col w-full gap-6 sm:pt-0 pt-10 ms:px-0 px-4">
      <div className="sm:w-[1230px] mx-auto w-full gap-5 flex flex-col items-start justify-start">
        <div className="flex justify-start w-full">
          <h1 className="font-extrabold text-left sm:text-3xl text-xl">
            Checkout
          </h1>
        </div>
        <StoreCheckout />
      </div>
    </section>
  );
}
