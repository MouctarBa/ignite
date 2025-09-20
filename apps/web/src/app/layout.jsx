import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteSettings, getFooterSettings, getBlogPage, getWorkPage } from '@/lib/strapi'
import clsx from 'clsx'
import { Inter, Lexend, Gochi_Hand } from 'next/font/google'
import '@/styles/globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

export const revalidate = parseInt(process.env.REVALIDATE_INTERVAL ?? '60', 10)

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
  let siteSettings = {}
  let footerSettings = {}
  let blogPage = {}
  let workPage = {}
  try {
    siteSettings = await getSiteSettings()
  } catch (e) {
    console.warn('Site settings unavailable, using defaults:', e?.message || e)
  }
  try {
    footerSettings = await getFooterSettings()
  } catch (e) {
    console.warn('Footer settings unavailable, using defaults:', e?.message || e)
  }
  try {
    blogPage = await getBlogPage()
  } catch (e) {
    console.warn('Blog page settings unavailable:', e?.message || e)
  }
  try {
    workPage = await getWorkPage()
  } catch (e) {
    console.warn('Work page settings unavailable:', e?.message || e)
  }

  const headerSettings = {
    ...siteSettings,
    // Treat undefined as enabled (true); explicitly false disables
    enableBlog: blogPage?.enabled !== false,
    enableWork: workPage?.enabled !== false,
  }
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
        <Header siteSettings={headerSettings} />
        {children}
        <Footer
          newsletter={footerSettings.newsletter}
          newsletterHeading={footerSettings.newsletterHeading}
          newsletterSubtext={footerSettings.newsletterSubtext}
          newsletterButtonLabel={footerSettings.newsletterButtonLabel}
          newsletterEmailPlaceholder={footerSettings.newsletterEmailPlaceholder}
          links={footerSettings.links}
          socialLinks={footerSettings.socialLinks || siteSettings.socialLinks}
          bookCallUrl={siteSettings.bookCallUrl}
          bookCallLabel={siteSettings.bookCallLabel}
          ctaHeading={footerSettings.ctaHeading}
          ctaText={footerSettings.ctaText}
        />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
