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
      try {
        await connectMongoDb();

        if (account?.provider === "google") {
          const googleAuthData = {
            email: profile?.email,
            name: profile?.name,
            image: profile?.picture,
            authProvider: "google",
          };

          console.log("profile: ", profile);

          const existingUser = await Users.findOne({ email: profile?.email });

          console.log("existingUser: ", existingUser);

          if (!existingUser) {
            const result = await Users.create(googleAuthData);
            console.log("result: ", result);
          } else {
            console.log("User already exists");
          }
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
  },
};
