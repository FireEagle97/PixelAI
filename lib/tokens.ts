import { getVerificationTokenByIdentifier } from "@/data/VerificationToken";
import { getPassworResetTokenByEmail } from "@/data/PasswordResetToken";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getPassworResetTokenByEmail(email);
    if(existingToken){
        await db.passwordResetToken.delete({
            where: {id: existingToken.id}
        });
    }
    const passwordResetToken = await db.passwordResetToken.create({
        data:{
            email,
            token,
            expires
        }
    });
    return passwordResetToken;
}
export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getVerificationTokenByIdentifier(email);

    if(existingToken){
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            },
        });
    }
    const verificaionToken = await db.verificationToken.create({
        data : {
            email,
            token,
            expires
        }
    });
    return verificaionToken;
}