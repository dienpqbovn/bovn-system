import { ReactNode } from 'react';

export const LayoutMain = ({ children }: { children: ReactNode }) => {
  return <main className="mx-auto max-w-7xl p-5 sm:p-10">{children}</main>;
};
