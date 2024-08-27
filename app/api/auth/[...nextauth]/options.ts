import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
export const options: NextAuthOptions = {

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID! as string,
            clientSecret: process.env.GITHUB_SECRET_ID! as string,
            authorization: { params: { scope: 'read:user user:email' } },

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
            },
            async authorize(credentials) {
                // this is where you need to retrieve user data
                // to verify with credentials
                // Docs: https://next-auth.js.or/configuration/providers/credentials
                console.log('GitHub Client ID:', process.env.NEXTAUTH_URL)
                console.log('GitHub Client Secret:', process.env.GITHUB_SECRET)

                const testuser = { id: "42", name: "Dave", password: "nextauth" }
                if (credentials?.username === testuser.name && credentials?.password == testuser.password) {
                    return testuser
                } else {
                    return null
                }
            }
        })
    ],
    debug: true,

}