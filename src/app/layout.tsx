import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Gotta catch em",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto mt-5">
        <div className="container px-10 py-5 rounded dark:bg-gray-800 bg-gray-400">
          <div>
            <h3>
              <a href="/">Pokedex</a>
            </h3>
          </div>
        </div>
        <div className="container px-10 py-5 my-5 rounded dark:bg-gray-800 bg-gray-400">
          {children}
        </div>
      </body>
    </html>
  );
}
