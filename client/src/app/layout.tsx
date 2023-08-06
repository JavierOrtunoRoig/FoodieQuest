import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ROUTES } from '@/routes'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FoodieQuest',
  description: 'Application for foodies that want to quest for the best food in the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <ul>
            {
              Object
                .entries(ROUTES)
                .map(([label, route]) => (
                  <li key={label}>
                    <Link
                      key={label}
                      href={route}
                    >
                      {label}
                    </Link>
                  </li>
                ))
            }
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
