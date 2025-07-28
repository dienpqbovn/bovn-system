import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
