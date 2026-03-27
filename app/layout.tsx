import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { Sidebar } from '@/components/navigation/sidebar'
import { MobileNav } from '@/components/navigation/mobile-nav'
import './globals.css'

export const metadata: Metadata = {
  title: 'FitTrack - Fitness Dashboard',
  description: 'Track your fitness goals with a modern dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto pb-20 lg:pb-0">
              {children}
            </main>
          </div>
          <MobileNav />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
