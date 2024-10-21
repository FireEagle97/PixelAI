import { db } from "@/lib/db";
import { handleError } from "@/lib/utils";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        return null;
    }
}
export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        return user;
    } catch {
        return null;
    }
}
export async function updateCredits(userId: string, creditFee: number) {
    try {

      const updatedUserCredits = await db.user.update({
        where: { id: userId }, 
        data: {
          creditBalance: {
            increment: creditFee, 
          },
        },
      });
  
      if(!updatedUserCredits) throw new Error("User credits update failed");
  
      return JSON.parse(JSON.stringify(updatedUserCredits));
    } catch (error) {
      handleError(error);
    }
  }