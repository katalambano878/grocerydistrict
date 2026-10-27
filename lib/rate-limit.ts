/**
 * Simple in-memory rate limiter for API routes
 * For production with multiple instances, use Redis-based rate limiting
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries periodically (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  maxRequests: number;
  /** Time window in seconds */
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number; // seconds until reset
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier for the client (IP, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const key = identifier;
  
  let entry = rateLimitStore.get(key);
  
  // If no entry or window expired, create new entry
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 1,
      resetTime: now + windowMs
    };
    rateLimitStore.set(key, entry);
    
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetIn: config.windowSeconds
    };
  }
  
  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    const resetIn = Math.ceil((entry.resetTime - now) / 1000);
    return {
      success: false,
      remaining: 0,
      resetIn
    };
  }
  
  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);
  
  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetIn: Math.ceil((entry.resetTime - now) / 1000)
  };
}

/**
 * Get client identifier from request (IP address)
 * @param request - The incoming request
 * @returns Client identifier string
 */
export function getClientIdentifier(request: Request): string {
  // The reverse proxy (Traefik on Coolify) overwrites X-Real-Ip with the
  // connecting address, so it cannot be spoofed by the client. The first
  // X-Forwarded-For entry can, so it is only a last resort.
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const hops = forwardedFor.split(',').map((h) => h.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }

  // Fallback to a default identifier
  return 'unknown';
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // Payment endpoints - strict limits
  payment: {
    maxRequests: 10,
    windowSeconds: 60 // 10 requests per minute
  },
  
  // Notification endpoints - moderate limits
  notification: {
    maxRequests: 20,
    windowSeconds: 60 // 20 requests per minute
  },
  
  // Callback endpoints - relaxed (webhooks from payment providers)
  callback: {
    maxRequests: 50,
    windowSeconds: 60 // 50 requests per minute
  },
  
  // Sign-in / sign-up - slow down password guessing
  auth: {
    maxRequests: 10,
    windowSeconds: 60
  },

  // Paid AI endpoints (chat, speech) - protect the API budget
  ai: {
    maxRequests: 20,
    windowSeconds: 60
  },

  // Public order lookups - stop order-number enumeration
  orderLookup: {
    maxRequests: 30,
    windowSeconds: 60
  },

  // General API - default limits
  default: {
    maxRequests: 100,
    windowSeconds: 60 // 100 requests per minute
  }
};
