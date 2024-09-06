// import type { NextAuthOptions } from "next-auth";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import GitHubProvider from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { dbClient } from "@/lib/database/mongoose";

// export const options: NextAuthOptions = {
//     adapter: MongoDBAdapter(dbClient),
//     providers: [
//         GitHubProvider({
//             clientId: process.env.NEXT_PUBLIC_GITHUB_ID! as string,
//             clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET_ID! as string,
//             authorization: { params: { 
//                 scope: 'read:user user:email',
//                 redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/github",        
//             } },

//         }),
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 username: {
//                     label: "Username:",
//                     type: "text",
//                     placeholder: "Your username"
//                 },
//                 password: {
//                     label: "Password",
//                     type: "password",
//                     placeholder: "Your password"
//                 }
//             },
//             async authorize(credentials) {
//                 // this is where you need to retrieve user data
//                 // to verify with credentials
//                 // Docs: https://next-auth.js.or/configuration/providers/credentials
//                 const testuser = { id: "42", name: "Dave", password: "nextauth" }
//                 if (credentials?.username === testuser.name && credentials?.password == testuser.password) {
//                     return testuser
//                 } else {
//                     return null
//                 }
//             }
//         })
//     ],
//     debug: true,

// }