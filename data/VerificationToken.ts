import { db } from "@/lib/db";

export const getVerificationTokenByIdentifier = async (
    email: string
) => {
    try {
        const verificaionToken = await db.verificationToken.findFirst({
            where: { email }
        });
        return verificaionToken;
    } catch {
        return null;
    }
}

export const getVerificationTokenByToken = async (
    token: string
) => {
    try {
        const verificaionToken = await db.verificationToken.findUnique({
            where: { token }
        });
        return verificaionToken;
    } catch {
        return null;
    }
} 