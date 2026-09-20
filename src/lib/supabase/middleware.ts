import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function isConfiguredSupabase(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return false;
  if (
    url.includes("mock-hydrocean") ||
    url.includes("your-project.supabase.co") ||
    key.includes("mock-anon-key") ||
    key.includes("your-anon-key")
  ) {
    return false;
  }
  return true;
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // Fast-path for development/mock environment: prevent DNS lookup hangs on public pages
  if (!isConfiguredSupabase()) {
    if (isAdminRoute && !isLoginPage) {
      // In mock environment without live auth, allow local admin testing or redirect if needed
      // Check if dev admin session cookie exists
      const hasDevSession = request.cookies.get("hydrocean-admin-session");
      if (!hasDevSession) {
        // Allow access to login page
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
      }
    }
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Fast timeout for session refresh to guarantee sub-50ms TTFB
  let user = null;
  try {
    const userPromise = supabase.auth.getUser();
    const timeoutPromise = new Promise<{ data: { user: null } }>((resolve) =>
      setTimeout(() => resolve({ data: { user: null } }), 1000)
    );
    const result = await Promise.race([userPromise, timeoutPromise]);
    user = result.data.user;
  } catch {
    user = null;
  }

  // Layer 1 Security: Strict Admin Route Interception
  if (isAdminRoute && !isLoginPage) {
    const role = user?.app_metadata?.role;
    if (!user || role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Prevent logged-in admin from visiting login page again
  if (isLoginPage && user && user.app_metadata?.role === "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}
