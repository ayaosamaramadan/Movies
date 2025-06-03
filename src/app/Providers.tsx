"use client";
import { SessionProvider } from "next-auth/react";
import ReduxProvider from "@/components/providers/ReduxProvider";
import ClientProvider from "@/components/providers/ClientProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider>
        <ClientProvider>{children}</ClientProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}