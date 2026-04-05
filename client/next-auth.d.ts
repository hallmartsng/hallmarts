import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      role: string;
      email: string;
    };
    refreshToken: string;
  }

  interface User {
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken: string;
    refreshToken: string;
  }
}
