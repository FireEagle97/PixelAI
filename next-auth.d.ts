import { UserRole } from "@prisma/client";
import NextAuth, {type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    id: string;
    isTwoFactorEnabled: boolean;
    creditBalance: Int;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}