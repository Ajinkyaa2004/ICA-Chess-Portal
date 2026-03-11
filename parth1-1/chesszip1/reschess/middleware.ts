import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production'
);

// Routes that require authentication
const protectedPaths = ['/dashboard'];

// Role-based route mapping
const roleRoutes: Record<string, string> = {
  '/dashboard/admin': 'ADMIN',
  '/dashboard/coach': 'COACH',
  '/dashboard/student': 'CUSTOMER',
  '/dashboard/customer': 'CUSTOMER',
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the path requires authentication
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (!isProtected) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;

  if (!accessToken && !refreshToken) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    let payload: { userId: string; email: string; role: string; name: string } | null = null;

    if (accessToken) {
      try {
        const { payload: jwtPayload } = await jwtVerify(accessToken, JWT_SECRET);
        payload = jwtPayload as unknown as { userId: string; email: string; role: string; name: string };
      } catch {
        // Access token expired, try refresh
      }
    }

    if (!payload && refreshToken) {
      const REFRESH_SECRET = new TextEncoder().encode(
        process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret'
      );
      try {
        const { payload: refreshPayload } = await jwtVerify(refreshToken, REFRESH_SECRET);
        payload = refreshPayload as unknown as { userId: string; email: string; role: string; name: string };
      } catch {
        // Refresh token also expired
        const loginUrl = new URL('/auth/login', req.url);
        loginUrl.searchParams.set('redirect', pathname);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        return response;
      }
    }

    if (!payload) {
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check role-based access
    for (const [routePrefix, requiredRole] of Object.entries(roleRoutes)) {
      if (pathname.startsWith(routePrefix) && payload.role !== requiredRole) {
        // Redirect to their own dashboard
        const dashboardMap: Record<string, string> = {
          ADMIN: '/dashboard/admin',
          COACH: '/dashboard/coach',
          CUSTOMER: '/dashboard/student',
        };
        const correctDashboard = dashboardMap[payload.role] || '/auth/login';
        return NextResponse.redirect(new URL(correctDashboard, req.url));
      }
    }

    return NextResponse.next();
  } catch {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
