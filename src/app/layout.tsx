import Header from "@/components/header";
import "./globals.css";
import { ReactNode } from "react";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "RunHub",
  description: "A community platform for runners",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-auto">{children}</main>

          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}
