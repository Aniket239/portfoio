import ClientWrapper from "@/components/ClientWrapper";
import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aniket Biswas",
  description: "Aniket Biswas's Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Science+Gothic:wght@100..900&display=swap"
          rel="stylesheet"
        />

      </head>
      <body>
        {/* Wrap everything in a client-side provider/loader */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
