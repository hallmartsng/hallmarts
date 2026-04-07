import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession, signOut } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env["NEXT_PUBLIC_API_BASE_URL"] || "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: async (headers) => {
    const session = await getSession();

    if (session?.accessToken) {
      headers.set("Authorization", `Bearer ${session.accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("🔄 Access token expired, refreshing...");

    // Get session again
    const session = await getSession();
    const refreshToken = session?.refreshToken;

    if (!refreshToken) {
      console.log("No refresh token found — signing out");
      signOut({ callbackUrl: "/vendor/auth" });
      return result;
    }

    // Try refreshing token via your backend
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as any).accessToken;
      const newRefreshToken =
        (refreshResult.data as any).refreshToken ?? refreshToken;

      // ✅ Update session manually (NextAuth doesn’t auto-refresh client-side)
      const res = await fetch("/api/auth/session?update=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        }),
      });

      if (res.ok) {
        console.log("✅ Token refreshed, retrying original request");
        // Retry original request with new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("❌ Failed to update session");
        signOut({ callbackUrl: "/vendor/auth" });
      }
    } else {
      console.log("❌ Refresh token invalid — signing out");
      signOut({ callbackUrl: "/vendor/auth" });
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Vendor"],
  endpoints: () => ({}), // empty here
});
