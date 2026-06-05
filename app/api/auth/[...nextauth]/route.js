import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        await connectDb();

        let currentUser = await User.findOne({
          email: user.email,
        });

        if (!currentUser) {
          let baseUsername = user.email.split("@")[0];

          let username = baseUsername;
          let counter = 1;

          while (
            await User.findOne({
              username,
            })
          ) {
            username = `${baseUsername}${counter}`;
            counter++;
          }

          await User.create({
            email: user.email,
            username,
            name: user.name,
            profilepic: user.image || "",
          });

          console.log("NEW USER CREATED");
        }

        return true;
      } catch (error) {
        console.error("SIGNIN ERROR:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        await connectDb();

        const dbUser = await User.findOne({
          email: session.user.email,
        });

        if (dbUser) {
          session.user.name = dbUser.username;
          session.user.username = dbUser.username;
          session.user.id = dbUser._id.toString();
        }

        return session;
      } catch (error) {
        console.error("SESSION ERROR:", error);
        return session;
      }
    },
  },
});

export { authoptions as GET, authoptions as POST };