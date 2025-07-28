'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import { Toaster } from '../ui';
import { ReactQueryProvider } from './ReactQueryProvider';

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
      <Toaster richColors position="top-right" />
    </SessionProvider>
  );
}
