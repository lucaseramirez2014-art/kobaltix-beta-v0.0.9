import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cobalix — Repository Management & Intelligence",
  description: "Cobalix v0.10 local-safe repository management and intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full flex flex-col bg-[#101114] text-[#E8EAF0] antialiased selection:bg-[#4285F4]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
