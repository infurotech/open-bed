import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Open Bed - Hospital & Rehabilitation Center Management System',
  description: 'Comprehensive bed management and patient tracking system for hospitals and rehabilitation centers in the USA. Streamline bed allocation, patient admissions, discharges, and facility operations.',
  keywords: ['hospital', 'rehabilitation', 'bed-management', 'healthcare', 'patient-tracking', 'usa'],
  authors: [{ name: 'Open Bed Team' }],
  creator: 'Open Bed Team',
  publisher: 'Open Bed Team',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://openbed.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Open Bed - Hospital & Rehabilitation Center Management System',
    description: 'Comprehensive bed management and patient tracking system for hospitals and rehabilitation centers in the USA.',
    url: 'https://openbed.com',
    siteName: 'Open Bed',
    images: [
      {
        url: '/images/logo/open-bed.png',
        width: 1200,
        height: 630,
        alt: 'Open Bed Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Bed - Hospital & Rehabilitation Center Management System',
    description: 'Comprehensive bed management and patient tracking system for hospitals and rehabilitation centers in the USA.',
    images: ['/images/logo/open-bed.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/favicon.png',
    },
  },
};

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
