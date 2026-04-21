import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "antd/dist/reset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "极深研几",
  description: "一个深色、极简、星空感的东方术数网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex-1 pt-[calc(var(--topbar-height)+3.75rem)]">{children}</div>
      </body>
    </html>
  );
}
