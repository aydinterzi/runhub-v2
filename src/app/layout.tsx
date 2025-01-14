// app/layout.tsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "RunHub",
  description: "A community platform for runners",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ClerkProvider, tüm uygulama genelinde auth bilgilerini sağlar */}
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
