"use server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { saltAndHashPassword } from "../utils";
import { getPasswordResetTokenByToken } from "@/data/PasswordResetToken";
import { getUserByEmail } from "@/data/user";
import { db } from "../db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
) => {
    if (!token) {
        return { error: "Missing token!"};
    }

    const validateFields = NewPasswordSchema.safeParse(values);
    if(!validateFields.success){
        return { error: "Invalid fields!"}
    }
    const { password} = validateFields.data;
    const existingToken = await getPasswordResetTokenByToken(token);
    if(!existingToken){
        return {error: "Invalid token!"};
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if(hasExpired){
        return { error: "Token has expired!"}
    }
    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return { error: "Email does not exist!"}
    }
    const hashedPassword = saltAndHashPassword(password);
    await db.user.update({
        where: {id: existingUser.id},
        data: {hashedPassword: hashedPassword},
    });
    await db.passwordResetToken.delete({
        where: { id: existingToken.id}
    });

    return {success: "Password updated!"}


}