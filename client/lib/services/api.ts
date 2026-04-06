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

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  let refreshToken;
  const session = await getSession();

  console.log("getSession: ", session?.refreshToken);
  if (session?.refreshToken) {
    refreshToken = session?.refreshToken;
  }

  // 🔥 If access token expired
  if (result.error && result.error.status === 401) {
    console.log("Access token expired. Attempting refresh...");

    // call refresh endpoint
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    console.log(refreshResult);
    if (refreshResult.data) {
      console.log("Token refreshed");
      console.log(refreshResult.data);

      // retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Refresh failed. Logging out.");

      await signOut({
        callbackUrl: "/vendor/auth",
      });
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
