import { Inter } from "next/font/google";
import "./globals.css";
// Providers
import Provider from "./theme-provider";
import { StopwatchProvider } from "@/components/stopwatchContext";
import { StopwatchModalProvider } from "@/components/stopwatchModalContext";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Timesage",
  description: "Manage your time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <NextUIProvider>
          <Provider>
            <StopwatchModalProvider>
              <StopwatchProvider>
                <main className="flex-1">{children}</main>
              </StopwatchProvider>
            </StopwatchModalProvider>
          </Provider>
        </NextUIProvider>
      </body>
    </html>
  );
}
