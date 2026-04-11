import AuthLayout from "@/components/vendor/authentication/AuthLayout";

export default function StoreAuthPage() {
  return (
    <section className="flex items-center flex-col w-full gap-6 sm:pt-0 pt-10 ms:px-0 px-4">
      <div className="sm:w-[1230px] mx-auto w-full gap-5 flex flex-col items-start justify-start">
        <AuthLayout page="store" />
      </div>
    </section>
  );
}
