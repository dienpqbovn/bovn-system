'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const LoginError = ({ error }: { error?: 'not_allowed' }) => {
  const router = useRouter();

  useEffect(() => {
    if (error && error === 'not_allowed') {
      setTimeout(() => {
        toast.error('You are not allowed to access this application.');
        router.replace('/login');
      }, 0);
    }
  }, [router, error]);

  return <></>;
};
