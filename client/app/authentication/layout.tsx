import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import Logo from "@/components/Logo";
import Link from "next/link";

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

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full bg-primary-50 flex-col items-center  min-h-screen justify-center px-2">
      <Link href={"/"} className=" flex mb-3 items-center justify-center">
        <Logo />
      </Link>{" "}
      {children}
    </section>
  );
}
