import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Users from "@/models/UserModel";
import { connectMongoDb } from "./mongodb";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      await connectMongoDb();
      if (account?.provider === "google") {
        const googleAuthData = {
          name: profile?.name,
          email: profile?.email,
          image: profile?.image,
          authProvider: "google",
        };
        const exist = await Users.findOne({
          email: profile?.email,
        });

        if (exist) {
          const result = await Users.create(googleAuthData);
          console.log(result);
        }
      }
      return true;
    },
  },
};
