import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import dbConnect from "@/lib/mongo"
import User from '@/model/user-model'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          // Return the default fields
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          // Add a new one
          role: 'user'
        };
      },

      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],


  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
    },
  },

  signIn: async ({ user, account, profile, email, credentials }) => {
    try {
      if (account?.provider === "google") {
        const { email, name } = user;

        await dbConnect();
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          await User.create({ email, name, role: 'user' });
        }

        // Log success and return true to allow sign-in
        console.log("Sign-in successful for:", email);
        return true;
      }

      // Default to allow sign-in for other providers
      return true;
    } catch (error) {
      // Log the error and return false to deny sign-in
      console.error("Error during sign-in:", error);
      return false;
    }
  },
})



