import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Run middleware on admin pages AND admin API routes (but skip static assets, nextauth, and public API)
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/((?!api/auth|api/contact|_next/static|_next/image|favicon.ico|uploads).*)',
  ],
};
