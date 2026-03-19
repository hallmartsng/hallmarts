import StoreNavbar from "@/components/store/StoreNavbar";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-primary-50 min-h-screen flex-col items-center gap-4 ">
      <StoreNavbar />
      <div className="pb-20">{children}</div>
    </section>
  );
}
