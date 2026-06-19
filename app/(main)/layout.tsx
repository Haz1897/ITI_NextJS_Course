import { NavBar } from "@/components/navbar";
import { Toasts } from "@/components/toasts";
import { SessionProvider } from "next-auth/react";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <NavBar />
        <main className="flex-grow-1">{children}</main>
        <Toasts />
      </SessionProvider>
    </>
  );
}
