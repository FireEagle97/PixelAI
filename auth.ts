import NextAuth, {DefaultSession} from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./db";
import authConfig from "./auth.config";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
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
  pages:{
    signIn: "/login",
    error: "/error"
  },
  events:{
    async linkAccount({ user }){
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date()}
      })
    }
  },
    callbacks: {
        async session({ token, session}) {
           if(token.sub && session.user){
            session.user.id = token.sub;
           }
           if(token.role && session.user){
            session.user.role = token.role as UserRole
           }
            return session;
        }       ,
        async jwt({token}) {
            if(!token.sub){
                return token;
            }
            const existingUser = await getUserById(token.sub);
            if(!existingUser) return token;
            token.role= existingUser.role;
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