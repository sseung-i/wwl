import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import PageWrapper from "@/components/layout/PageWrapper";
import Header from "@/components/common/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
