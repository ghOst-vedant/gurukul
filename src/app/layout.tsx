import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DesktopNavbar from "@/components/navbar/DesktopNavbar";
import { MobileNavbar } from "@/components/navbar/MobileNavbar";
import { Footer } from "@/components/ui/Footer";

import RecoilContextProvider from "@/components/ui/RecoilContextProvider";
import Login from "@/components/popups/Login";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import SessionSync from "@/lib/SessionSync";
import { userSessionAtom } from "@/recoil/Atoms/userSession";
import { log } from "node:console";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gurukul - Ai Powered LMS",
  description:
    "A place to study and educated yourself by learning from the best people in industry.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <RecoilContextProvider>
        <SessionSync />
        <html lang="en">
          <body className={inter.className}>
            <Login />
            <span className={`lg:hidden`}>
              <MobileNavbar />
            </span>
            <span className={`hidden lg:block`}>
              <DesktopNavbar />
            </span>
            {children}
            <Footer />
          </body>
        </html>
      </RecoilContextProvider>
    </SessionProvider>
  );
}
