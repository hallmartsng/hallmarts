import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      role: string;
      email: string;
      phone: string;
      name: string;
      campus: string;
      country: string;
      regNo: string;
    };
    refreshToken: string;
  }

  interface User {
    role: string;
    accessToken: string;
    refreshToken: string;
    phone: string;
    name: string;
    campus: string;
    country: string;
    regNo: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    phone: string;
    name: string;
    campus: string;
    country: string;
    regNo: string;
  }
}
