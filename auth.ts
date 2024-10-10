import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { isGeneratorFunction } from "util/types";
import { getTwoFactorConfirmationByUserId } from "./data/TwoFactorConfirmation";
declare module "next-auth" {
  interface Session {
    user: {
      role: string
    } & DefaultSession["user"]
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
    async signIn({ user, account}){
      //Allow OAuth without email verification
      if(account?.provider !== "credentials") return true;
      const existingUser = user.id ? await getUserById(user.id) : null;
      //Prevent sign in without email verification
      if(!existingUser?.emailVerified) return false;

      if(existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
        if(!twoFactorConfirmation) return false
        //Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {id: twoFactorConfirmation.id}
        })
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  // providers: [
  //     GitHubProvider({
  //         clientId: process.env.AUTH_GITHUB_ID! as string,
  //         clientSecret: process.env.AUTH_GITHUB_SECRET_ID! as string,
  //         // authorization: {
  //         //     params: {
  //         //         scope: 'read:user user:email',
  //         //         redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/github",
  //         //     }
  //         // },

  //     }),
  //     CredentialsProvider({
  //         name: "Credentials",
  //         credentials: {
  //             email: {
  //                 label: "Email",
  //                 type: "text",
  //                 placeholder: "Your email"
  //             },
  //             password: {
  //                 label: "Password",
  //                 type: "password",
  //                 placeholder: "Your password"
  //             }
  //         },
  //         authorize: async (credentials) => {
  //             if(!credentials || !credentials.email || !credentials.password){
  //                 return null;
  //             }
  //             const email = credentials.email as string;
  //             const hash = saltAndHashPassword(credentials.password)
  //             let user: any = await db.user.findUnique({
  //                 where: {
  //                     email,
  //                 }
  //             })
  //             if(!user) {
  //                 user = await db.user.create({
  //                     data: {
  //                         email,
  //                         hashedPassword: hash,
  //                     }
  //                 })
  //             }else{
  //                 const isMatch = bcrypt.compareSync(credentials.password as string, user.hashedPassword);
  //                 if(!isMatch){
  //                     throw new Error("Incorrect password.");
  //                 }
  //             }
  //             return user;
  //         }
  //     }),
  // ],
});