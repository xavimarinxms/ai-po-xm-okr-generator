import type { Metadata } from 'next';
import './globals.css';
import TourProvider from '@/components/tour/TourProvider';
import { getTourFor } from '@/lib/tour';

export const metadata: Metadata = {
  title: 'OKR Generator + Tracker — by Xavi Marín',
  description: 'Generate structured OKRs from your product mission and track progress across the quarter. Part of the PO Toolkit by Xavi Marín.',
  authors: [{ name: 'Xavi Marín', url: 'https://xavimarin.net' }],
  metadataBase: new URL('https://okr-generator.xavimarin.net'),
};

const STEPS = getTourFor('okr-generator');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-gray-50 text-gray-900 min-h-screen antialiased"><TourProvider steps={STEPS}>{children}</TourProvider></body>
    </html>
  );
}
