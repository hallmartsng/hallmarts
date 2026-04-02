import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/nextAuthOptions";
import { ReduxProvider } from "@/lib/providers/ReduxProvider";
import { HeroUIProviders } from "@/lib/providers/HeroUIProvider";

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ReduxProvider session={session}>
          <HeroUIProviders
            themeProps={{ attribute: "class", defaultTheme: "light" }}
          >
            <main className="flex-grow">{children}</main>
          </HeroUIProviders>
        </ReduxProvider>

        {/* <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js-na1.hs-scripts.com/48927544.js"
        ></script> */}
      </body>
    </html>
  );
}
