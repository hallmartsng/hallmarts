import StoreNavbar from "@/components/store/StoreNavbar";
import "react-image-gallery/styles/image-gallery.css";
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-primary-50 min-h-screen flex-col items-center gap-4 ">
      <StoreNavbar />
      <div className="pb-20 w-full pt-4">{children}</div>
    </section>
  );
}
