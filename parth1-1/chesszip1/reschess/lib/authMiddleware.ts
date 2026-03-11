import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, verifyRefreshToken, signAccessToken, JWTPayload } from './auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

type RouteHandler = (
  req: NextRequest,
  context: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

type AuthenticatedRouteHandler = (
  req: NextRequest,
  context: { params: Promise<Record<string, string>>; user: JWTPayload }
) => Promise<NextResponse>;

// Middleware wrapper for protected API routes
export function withAuth(
  handler: AuthenticatedRouteHandler,
  allowedRoles?: string[]
): RouteHandler {
  return async (req: NextRequest, context: { params: Promise<Record<string, string>> }) => {
    // Get access token from cookie
    const accessToken = req.cookies.get('access_token')?.value;
    const refreshToken = req.cookies.get('refresh_token')?.value;

    let user: JWTPayload | null = null;
    let newAccessToken: string | null = null;

    if (accessToken) {
      user = verifyAccessToken(accessToken);
    }

    // Try refresh if access token is expired
    if (!user && refreshToken) {
      const refreshPayload = verifyRefreshToken(refreshToken);
      if (refreshPayload) {
        user = {
          userId: refreshPayload.userId,
          email: refreshPayload.email,
          role: refreshPayload.role,
          name: refreshPayload.name,
        };
        newAccessToken = signAccessToken(user);
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    // Check role authorization
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { error: 'Forbidden. Insufficient permissions.' },
        { status: 403 }
      );
    }

    // Call the handler with user context
    const response = await handler(req, { ...context, user });

    // Set refreshed access token if needed
    if (newAccessToken) {
      response.cookies.set('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 60,
      });
    }

    return response;
  };
}
