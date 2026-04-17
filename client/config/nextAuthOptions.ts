import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        regNo: {},
        password: {},
        endpoint: {},
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${credentials?.endpoint}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              regNo: credentials?.regNo,
              password: credentials?.password,
            }),
          },
        );

        const data = await res.json();
        if (res.status === 400) {
          throw new Error(
            data?.message || "Invalid request. Please check your inputs.",
          );
        }

        if (res.status === 401) {
          throw new Error(
            data?.message || "Unauthorized. Incorrect email or password.",
          );
        }

        if (!res.ok) {
          throw new Error(
            data?.message || "Something went wrong. Please try again later.",
          );
        }

        console.log("data login data: ", data);

        return {
          id: data.user._id,
          email: data.user.email,
          role: data.user.role,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          phone: data.user.phone,
          name: data.user.fname,
          campus: data.user.campus,
          country: data.user.countryCode,
          regNo: data.user.regNo,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("user jwt: ", user);
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.name = user.name;
        token.phone = user.phone;
        token.campus = user.campus;
        token.country = user.country;
        token.regNo = user.regNo;
      }

      return token;
    },

    async session({ session, token }) {
      console.log("token session: ", token);
      session.user.id = token.id;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.name = token.name;
      session.user.phone = token.phone;
      session.user.campus = token.campus;
      session.user.country = token.country;
      session.user.regNo = token.regNo;

      return session;
    },
  },
  // pages: {
  //   signOut: "/vendor/auth",
  //   signIn: "/vendor/auth",
  // },
  secret: process.env["NEXTAUTH_SECRET"],
};
