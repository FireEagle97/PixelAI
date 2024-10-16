import { auth } from "@/auth";
import { ExtendedUser } from "@/next-auth";

export const currentUser = async () => {
    const session = await auth();
    return session?.user as ExtendedUser;
}

export const currentRole = async () => {
    const session = await auth();
    return session?.user.role;
}