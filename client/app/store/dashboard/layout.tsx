import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  console.log("Dashboard:", session);

  if (!session?.user.email && session?.user.role !== "user") {
    return redirect("/store/auth");
  }
  return (
    <section className="flex items-center flex-col w-full gap-6 sm:pt-0 pt-10 ms:px-0 px-4">
      <div className="sm:w-[1230px] mx-auto w-full gap-5 flex flex-col items-start justify-start">
        {children}
      </div>
    </section>
  );
}
