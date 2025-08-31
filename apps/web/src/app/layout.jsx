import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/strapi'
import clsx from 'clsx'
import { Inter, Lexend, Gochi_Hand } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})
const gochiHand = Gochi_Hand({
  subsets: ['latin'],
  variable: '--font-gochi-hand',
  display: 'swap',
  weight: '400',
})

export const metadata = {
  title: {
    template: '%s - Doris Chinedu-Okoro',
    default:
      'Doris Chinedu-Okoro \u2013 Education Consultant & CEO | Evergreen Group of Schools',
  },
}

export default async function RootLayout({ children }) {
  const siteSettings = await getSiteSettings()
  return (
    <html lang="en">
      <body
        className={clsx(
          'font-sans',
          inter.variable,
          lexend.variable,
          gochiHand.variable
        )}
      >
        <Header siteSettings={siteSettings} />
        {children}
        <Footer
          socialLinks={siteSettings.socialLinks}
          bookCallUrl={siteSettings.bookCallUrl}
        />
      </body>
    </html>
  )
}
