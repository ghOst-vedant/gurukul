import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DesktopNavbar from "@/components/navbar/DesktopNavbar";
import { MobileNavbar } from "@/components/navbar/MobileNavbar";
import { Footer } from "@/components/ui/Footer";
import { UnderprogressPopup } from "@/components/ui/UnderprogressPopup";
import RecoilContextProvider from "@/components/ui/RecoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gurukul - Ai Powered LMS",
  description:
    "A place to study and educated yourself by learning from the best people in industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilContextProvider>
          <UnderprogressPopup />
          <span className={`lg:hidden`}>
            <MobileNavbar />
          </span>
          <span className={`hidden lg:block`}>
            <DesktopNavbar />
          </span>
          {children}
          <Footer />
        </RecoilContextProvider>
      </body>
    </html>
  );
}
