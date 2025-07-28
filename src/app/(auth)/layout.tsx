import { ReactNode } from 'react';

export default function LayoutAuth({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-5 sm:p-10">
      {children}
    </main>
  );
}
