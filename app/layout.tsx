import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI工具库 - 中文AI工具导航",
  description: "发现最好用的中文AI工具，国内可用优先。编程、设计、写作、效率工具一站式导航。",
  keywords: "AI工具,人工智能,ChatGPT,Claude,AI编程,AI设计,国产AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
