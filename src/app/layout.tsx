import clsx from "clsx";
import { Inter } from "next/font/google";
import { FilesProvider } from "./context/filesContext";
import { readProviderCookies } from "./context/server";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const providerValues = await readProviderCookies();

  return (
    <FilesProvider {...providerValues}>
      <html lang="en" className="h-full">
        <body className={clsx(inter.className, "h-full")}>{children}</body>
      </html>
    </FilesProvider>
  );
}
