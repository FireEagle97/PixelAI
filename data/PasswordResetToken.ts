import { db } from "@/lib/db";

export const getPasswrodResetTokenByToken = async (email: string,token:string) => {
    try{
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where:{
                email_token: {
                    email: email,
                    token: token
                }
            }
        });
        return passwordResetToken;
    } catch {
        return null;
    }
}
export const getPassworResetTokenByEmail = async (email: string) => {
    try{
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {email}
        });
        return passwordResetToken;
    } catch{
        return null;
    }
}