"use server";

// import { revalidatePath } from "next/cache";

// import User from "../database/models/user.model";
// // import { connectToDatabase } from "../database/mongoose";
// import { handleError } from "../utils";

// // CREATE
// export async function createUser(user: CreateUserParams) {
//   try {
//     await connectToDatabase();

//     const newUser = await User.create(user);

//     return JSON.parse(JSON.stringify(newUser));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // READ
// export async function getUserById(userId: string) {
//   try {
//     await connectToDatabase();

//     const user = await User.findOne({ userId: userId });

//     if (!user) throw new Error("User not found");

//     return JSON.parse(JSON.stringify(user));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // UPDATE
// export async function updateUser(userId: string, user: UpdateUserParams) {
//   try {
//     await connectToDatabase();

//     const updatedUser = await User.findOneAndUpdate({ userId }, user, {
//       new: true,
//     });

//     if (!updatedUser) throw new Error("User update failed");
    
//     return JSON.parse(JSON.stringify(updatedUser));
//   } catch (error) {
//     handleError(error);
//   }
// }

// // DELETE
// export async function deleteUser(userId: string) {
//   try {
//     await connectToDatabase();

//     // Find user to delete
//     const userToDelete = await User.findOne({ userId });

//     if (!userToDelete) {
//       throw new Error("User not found");
//     }

//     // Delete user
//     const deletedUser = await User.findByIdAndDelete(userToDelete._id);
//     revalidatePath("/");

//     return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
//   } catch (error) {
//     handleError(error);
//   }
// }

// export async function updateUserMetadata(nextAuthUserId: string, metadata: Record<string, any>): Promise<typeof User | null> {
//   try {
//     // Find the user by their ID and update the public metadata
//     const updatedUser = await User.findOneAndUpdate(
//       { userId: nextAuthUserId }, // Assuming `nextAuthId` is the field storing the user's NextAuth.js ID
//       { $set: { publicMetadata: metadata } }, // Update the `publicMetadata` field with the new metadata
//       { new: true } // Return the updated user document
//     );

//     if (!updatedUser) {
//       console.error(`User with ID ${nextAuthUserId} not found`);
//       return null;
//     }

//     return updatedUser;
//   } catch (error) {
//     console.error("Error updating user metadata:", error);
//     throw new Error("Failed to update user metadata");
//   }
// }
// USE CREDITS
