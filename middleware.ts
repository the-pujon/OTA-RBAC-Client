// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const isPublicPath =
//     path === "/auth/signin" ||
//     path === "/auth/signup" ||
//     path === "/auth/request-recovery";

//   if (isPublicPath) {
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/dashboard/:path*",
//     "/auth/signin",
//     "/auth/signup",
//     "/auth/request-recovery",
//   ],
// };





// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isTokenExpired } from '@/utils/isTokenExpired';

// Define protected routes and their allowed roles
const protectedRoutes = [
  {
    path: '/dashboard',
    roles: ['admin', 'user', 'moderator', 'superAdmin'], // Anyone with these roles can access dashboard
  },
  {
    path: '/dashboard/admins',
    roles: ['superAdmin'], // Only admins can access this
  },
  {
    path: '/dashboard/moderators',
    roles: ['admin', 'superAdmin'],
  },
  {
    path: '/dashboard/users',
    roles: ['admin','superAdmin'],
  },
  {
    path: '/dashboard/posts',
    roles: ['moderator','superAdmin'],
  },
  {
    path: '/dashboard/posts/create',
    roles: ['moderator','superAdmin'],
  },
  
  // Add more protected routes as needed
];

// Function to check if route requires authentication and what roles are allowed
function getRouteProtection(path: string): { isProtected: boolean; requiredRoles?: string[] } {
  // Normalize the path to handle trailing slashes consistently
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  
  // Check for exact matches first
  const exactMatch = protectedRoutes.find(route => route.path === normalizedPath);
  if (exactMatch) {
    return { isProtected: true, requiredRoles: exactMatch.roles };
  }
  
  // Then check if the path is a sub-path of any protected route
  for (const route of protectedRoutes) {
    if (normalizedPath.startsWith(route.path) && 
       (normalizedPath.length === route.path.length || normalizedPath[route.path.length] === '/')) {
      return { isProtected: true, requiredRoles: route.roles };
    }
  }
  
  return { isProtected: false };
}

// Import parseJwt from your utils if needed
import { parseJwt } from '@/utils/isTokenExpired';

export async function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get('auth_token')?.value;
  
  // Get the requested path
  const path = request.nextUrl.pathname;
  
  // Skip authentication for public routes and static assets
  if (path.startsWith('/_next') || 
      path.startsWith('/api/public') || 
      path.startsWith('/auth') ||
      path === '/favicon.ico' ||
      path.startsWith('/public')) {
    return NextResponse.next();
  }
  
  // Check if the route requires protection
  const { isProtected, requiredRoles } = getRouteProtection(path);
  
  // If the route is not protected, allow access
  if (!isProtected) {
    return NextResponse.next();
  }
  
  // If no token is found, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  
  // Check if token is expired using your existing utility
  if (isTokenExpired(token)) {
    // Token expired, redirect to login
    const response = NextResponse.redirect(new URL('/auth/signin', request.url));
    // Clear the expired cookie
    response.cookies.delete('auth_token');
    return response;
  }
  
  // If role-based access is required, check user's role
  if (requiredRoles && requiredRoles.length > 0) {
    try {
      // Decode token to get user role
      const decodedToken = parseJwt(token);
      const userRole = decodedToken.role;
      
      // Check if user has the required role
      if (!requiredRoles.includes(userRole)) {
        // User doesn't have permission - redirect to dashboard or unauthorized page
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // If token parsing fails, redirect to login
      const response = NextResponse.redirect(new URL('/auth/signin', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
  }
  
  // User is authenticated and authorized, allow access
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - API routes that don't need auth
     * - Static files
     * - Authentication pages
     */
    '/((?!_next/static|_next/image|favicon.ico|public|auth/signin|auth/signup|auth/forgot-password).*)',
  ],
};