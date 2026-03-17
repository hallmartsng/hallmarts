import Navbar from "@/components/Navbar";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen w-full text-black max-w-7xl flex-col items-center justify-between py-32 px-16  sm:items-start">
        {children}
      </main>
      <footer>Footer</footer>
    </>
  );
}
