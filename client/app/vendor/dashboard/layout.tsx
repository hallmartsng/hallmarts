import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import VendorDashboardNavbar from "@/components/vendor/dashboard/VendorDashboardNavbar";
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

  if (!session?.user.email) {
    return redirect("/vendor/auth");
  }
  return (
    <section className="flex w-full bg-primary-50 flex-col items-center  min-h-screen ">
      <VendorDashboardNavbar />
      <div className="sm:w-[1240px] w-full sm:px-0 px-2 ">{children}</div>
    </section>
  );
}
