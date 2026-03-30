"use client";
import { HeroUIProviders } from "@/lib/providers/HeroUIProvider";
import { ReduxProvider } from "@/lib/providers/ReduxProvider";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  return (
    <ReduxProvider session={session}>
      <HeroUIProviders
        themeProps={{ attribute: "class", defaultTheme: "light" }}
      >
        {children}
      </HeroUIProviders>
    </ReduxProvider>
  );
}
