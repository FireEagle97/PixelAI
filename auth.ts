import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { isGeneratorFunction } from "util/types";
import { getTwoFactorConfirmationByUserId } from "./data/TwoFactorConfirmation";
import { ExtendedUser } from "./next-auth";
declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error"
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Ensure user has an ID
      if (!user?.id) return false;
      //Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;
      // const existingUser = user.id ? await getUserById(user.id) : null;
      const existingUser = await getUserById(user.id);
      if(!existingUser) return false;
      //Prevent sign in without email verification
      // if (!existingUser?.emailVerified) return false;

      // if (existingUser.isTwoFactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      //   if (!twoFactorConfirmation) return false
      //   //Delete two factor confirmation for next sign in
      //   await db.twoFactorConfirmation.delete({
      //     where: { id: twoFactorConfirmation.id }
      //   })
      // }

      return true;
    },
    async session({ token, session }) {
      if (!token.sub) {
        throw new Error("No user ID in token");
      }

      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
        // session.user.isTwoFactorEnabled = !!token.isTwoFactorEnabled;
        session.user.creditBalance = token.creditBalance || 0;
      }
      // if (token.sub && session.user) {
      //   session.user.id = token.sub;
      // }
      // if (token.role && session.user) {
      //   session.user.role = token.role as UserRole
      // }
      // if (session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      //   session.user.creditBalance = token.creditBalance as number;
      // }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.creditBalance = existingUser.creditBalance;
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});