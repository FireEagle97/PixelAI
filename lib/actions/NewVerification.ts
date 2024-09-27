"use server";

import {db} from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/VerificationToken";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    if(!existingToken){
        return {error: "Token does not exist!"};
    }
    const today = new Date();
    const hasExpired = new Date(existingToken.expires) < today;
    console.log(existingToken);
    console.log(hasExpired);
    console.log(today);
    if(hasExpired) {
        return { error: "Token has expired!"};
    }

    const existingUser = await getUserByEmail(existingToken.identifier);

    if(!existingUser) {
        return { error: "Email does not exist"}
    }
    await db.user.update({
        where: {id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.identifier,
        }
    })
    await db.verificationToken.delete({
        where: { id: existingToken.id }
    });

    return {success: "Email verified!"}
}