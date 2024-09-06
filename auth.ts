import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { db } from "./db";
export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID! as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET_ID! as string,
            authorization: {
                params: {
                    scope: 'read:user user:email',
                    redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/github",
                }
            },

        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Your username"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Your password"
                }
            }
        }),
    ],
});