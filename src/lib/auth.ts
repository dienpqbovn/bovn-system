import { NextAuthOptions, Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextResponse } from 'next/server';

import { checkEmailInGoogleSheet } from './google-sheet';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email;
      if (!email || !(await checkEmailInGoogleSheet(email))) {
        return '/login?error=not_allowed';
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const withAuth = async (
  handler: (session: Session) => Promise<NextResponse>,
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { code: 401, message: 'Unauthorized' },
      { status: 401 },
    );
  }

  return handler(session);
};
