import Image from 'next/image';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components/ui';

import { LoginGoogle } from './_components';
import { LoginError } from './_components/LoginError';

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{
    error?: 'not_allowed';
  }>;
}) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="justify-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            priority
            className="mx-auto size-14"
          />
          <CardTitle className="text-center">Welcome BOVN</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <LoginGoogle />
        </CardContent>
      </Card>

      <LoginError error={error} />
    </>
  );
}
