import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Providers from "./redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo",
  description: "Anas Todo Apps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <AppRouterCacheProvider>
          <body className={inter.className} suppressHydrationWarning={true}>
            {children}
          </body>
        </AppRouterCacheProvider>
      </Providers>
    </html>
  );
}
