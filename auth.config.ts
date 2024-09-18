import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/user"
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Github({
            clientId: process.env.AUTH_GITHUB_ID! as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET_ID! as string,
        }),
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET_ID as string
        }),
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials)
                if (validateFields.success) {
                    const { email, password } = validateFields.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.hashedPassword) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);
                    if (passwordsMatch) return user;
                }
                return null;
            }
        })
    ],
} satisfies NextAuthConfig
