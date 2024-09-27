import { getVerificationTokenByIdentifier } from "@/data/VerificationToken";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
export const generateVerificationToken = async (identifier: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getVerificationTokenByIdentifier(identifier);

    if(existingToken){
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            },
        });
    }
    const verificaionToken = await db.verificationToken.create({
        data : {
            identifier,
            token,
            expires
        }
    });
    return verificaionToken;
}