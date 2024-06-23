import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import { getServerAuthSession } from "@/server/auth";
import { ThemeProvider } from "@/providers/ThemeProvider";
import SessionProvider from "@/providers/SessionProvider";
// import { WebSocketProvider } from "@/providers/WebsocketProvider";

export const metadata = {
  title: "Kyoukatalk",
  description:
    "Kyoukatalk is an advanced communication platform designed to make it easy for you to connect with friends, family and co-workers. With instant messaging features, high-quality voice and video calls, and end-to-end encryption, we ensure the privacy and security of your communications. Enjoy a fast, easy and secure communication experience anywhere and anytime with just a few clicks.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="dark">
              {children}
            </ThemeProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
