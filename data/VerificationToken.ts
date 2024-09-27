import { db } from "@/lib/db";

export const getVerificationTokenByIdentifier = async (
    identifier: string
) => {
    try {
        const verificaionToken = await db.verificationToken.findFirst({
            where: { identifier }
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
        const verificaionToken = await db.verificationToken.findFirst({
            where: { token }
        });
        return verificaionToken;
    } catch {
        return null;
    }
} 