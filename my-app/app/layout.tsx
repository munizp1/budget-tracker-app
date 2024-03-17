import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Head from 'next/head';
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Budget Tracker",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head> {/* Use the Head component to modify the head section */}
        <title>{metadata.title}</title> {/* Set the document title */}
        <link rel="icon" href="./icon.png" /> {/* Set the favicon */}
      </Head>
      <html lang="en" className={GeistSans.className}>
        <body className="bg-background text-foreground">
          <main>
            {children}
          </main>
        </body>
      </html>
    </>
  );
}
