import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ReactQueryProvider } from '@/components/providers';
import { Toaster } from '@/components/ui';
import { cn } from '@/lib/utils';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BOVN System',
  description: 'A system for managing BOVN',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
