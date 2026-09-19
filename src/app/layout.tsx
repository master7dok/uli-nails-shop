import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UliNail — Luxury Beauty Studio & Professional Nail Care",
  description: "Професійні матеріали для манікюру нового покоління. Каучукові бази, кришталеві топи, гелі для нарощення та доглядова косметика преміум-класу.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className="antialiased min-h-screen bg-nude-50 text-charcoal">
        {children}
      </body>
    </html>
  );
}
