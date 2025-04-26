import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SonnerProvider } from "@/components/sonner-provider"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fast Budget - Financial Management App",
  description: "Track your finances, manage budgets, and plan your financial future.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <SonnerProvider />
          {children}
        </Providers>
      </body>
    </html>
  )
}
