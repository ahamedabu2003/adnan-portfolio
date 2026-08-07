import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.is_admin = (user as any).is_admin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).is_admin = token.is_admin;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = (auth?.user as any)?.is_admin;
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      const isApiAdminRoute = nextUrl.pathname.startsWith('/api/admin');

      if (isAdminRoute || isApiAdminRoute) {
        if (isLoggedIn && isAdmin) return true;
        return false; // Redirects to signIn page
      }
      return true;
    },
  },
  providers: [], // Will be populated in auth.ts with Credentials
} satisfies NextAuthConfig;
