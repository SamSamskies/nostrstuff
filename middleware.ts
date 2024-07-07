import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Apply CORS headers to all API routes for GET requests
  if (request.nextUrl.pathname.startsWith("/api") && request.method === "GET") {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    return new Response(null, {
      headers,
      status: 204,
    });
  }

  return response;
}

export const config = {
  matcher: "/api/:path*", // Apply to all API routes
};
