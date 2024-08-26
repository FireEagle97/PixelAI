import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET_ID as string,
                
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
            async authorize(credentials){
                // this is where you need to retrieve user data
                // to verify with credentials
                // Docs: https://next-auth.js.or/configuration/providers/credentials
                const testuser = { id: "42", name: "Dave", password: "nextauth" }
                if(credentials?.username === testuser.name && credentials?.password == testuser.password){
                    return testuser
                }else{
                    return null
                }
            }
        })
    ],

}