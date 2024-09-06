import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { db } from "./db";
import credentials from "next-auth/providers/credentials";
import { saltAndHashPassword } from "./lib/utils";
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
            // authorization: {
            //     params: {
            //         scope: 'read:user user:email',
            //         redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/github",
            //     }
            // },

        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Your email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Your password"
                }
            },
            authorize: async (credentials) => {
                if(!credentials || !credentials.email || !credentials.password){
                    return null;
                }
                const email = credentials.email as string;
                const hash = saltAndHashPassword(credentials.password)
                let user: any = await db.user.findUnique({
                    where: {
                        email,
                    }
                })
                if(!user) {
                    user = await db.user.create({
                        data: {
                            email,
                            hashedPassword: hash,
                        }
                    })
                }else{
                    const isMatch = bcrypt.compareSync(credentials.password as string, user.hashedPassword);
                    if(!isMatch){
                        throw new Error("Incorrect password.");
                    }
                }
                return user;
            }
        }),
    ],
});