import StoreCart from "@/components/store/StoreCart";

export default function StoreCartPage() {
  return (
    <section className="flex items-center w-full flex-col gap-6 sm:pt-0 pt-10 ms:px-0 px-4">
      <div className="sm:w-[1230px] w-full gap-5 flex flex-col items-start justify-start">
        <div className="flex w-full justify-start ">
          <h1 className="font-extrabold text-left">Your shopping Cart</h1>
        </div>
        <StoreCart />
      </div>
    </section>
  );
}
