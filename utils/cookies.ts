// src/utils/cookies.ts

// Set a cookie with security options
export function setAuthCookie(token: string, expiryDays = 7) {
    // Calculate expiration date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);
    
    // Set secure cookie attributes
    const cookieString = `auth_token=${token}; expires=${expiryDate.toUTCString()}; path=/; ${
      process.env.NODE_ENV === 'production' ? 'secure; ' : ''
    }samesite=strict`;
    
    // Set the cookie
    document.cookie = cookieString;
  }
  
  // Get a cookie by name
  export function getAuthCookie(): string | null {
    if (typeof document === 'undefined') return null; // Check if we're on client side
    
    const cookies = document.cookie.split(';');
    const authCookie = cookies
      .find(cookie => cookie.trim().startsWith('auth_token='));
    
    if (!authCookie) return null;
    
    return authCookie.trim().substring('auth_token='.length);
  }
  
  // Remove auth cookie (for logout)
  export function removeAuthCookie() {
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }