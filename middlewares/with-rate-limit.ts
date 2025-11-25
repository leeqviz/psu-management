import {
  NextResponse,
  type NextFetchEvent,
  type NextMiddleware,
  type NextRequest,
} from "next/server";

function getIp(request: NextRequest): string {
  // 1. Try the native Next.js helper (works on Vercel/Edge)
  let ip = undefined; //request.ip;

  // 2. Try the standard proxy header (works on self-hosting/AWS/Node)
  // This header can contain multiple IPs: "client, proxy1, proxy2". We want the first one.
  if (!ip) {
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) {
      ip = forwardedFor.split(",")[0].trim();
    }
  }

  // 3. Fallback for Localhost
  // If both fail, we are likely on dev without a proxy.
  return ip ?? "127.0.0.1";
}

const rateLimitMap = new Map();

// 2. Define the Limit window
const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS = 100; // Allow 100 requests per minute

export function withRateLimit(next: NextMiddleware): NextMiddleware {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const ip = getIp(request);

    const windowStart = Date.now() - WINDOW_SIZE_IN_SECONDS * 1000;

    // 3. Get data for this IP
    // Structure: { count: number, lastRequest: number }
    const requestStats = rateLimitMap.get(ip) || {
      count: 0,
      lastRequest: Date.now(),
    };

    // 4. Logic: Reset or Increment
    if (requestStats.lastRequest < windowStart) {
      // Time window expired, reset count
      requestStats.count = 1;
      requestStats.lastRequest = Date.now();
    } else {
      // Inside window, increment
      requestStats.count++;
    }

    // Update the store
    rateLimitMap.set(ip, requestStats);

    // 5. Check Limit
    if (requestStats.count > MAX_REQUESTS) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }

    // 6. Add IP to headers (Optional - useful for server components to know the IP)
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", MAX_REQUESTS.toString());
    response.headers.set(
      "X-RateLimit-Remaining",
      (MAX_REQUESTS - requestStats.count).toString()
    );
    console.log(`RateLimit: IP ${ip} has made ${requestStats.count} requests.`);

    return next(request, _next);
  };
}
