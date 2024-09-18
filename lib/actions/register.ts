"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import {db} from "@/db";
import {getUserByEmail} from "@/data/user"
import {RegisterSchema } from "@/schemas";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return {error: "Invalid Credentials!"};
    }
    const { email, password, name} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password,10);
    const existingUser = await getUserByEmail(email);
    if(existingUser){
        return { error: "Email already in use!"}
    }
    await db.user.create({
        data: {
            name,
            email,
            hashedPassword: hashedPassword,
        }
    });

    //TODO: Send verification token email
    return {success: "User created!"}
}