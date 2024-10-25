"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { handleError } from "../utils";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";

const getImageWithAuthor = async (imageId: string) => {
    const image = await db.image.findUnique({
        where: {
            id: imageId,  // Use the appropriate identifier for the image
        },
        include: {
            author: { // Include the author relation
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    return image;
};
// ADD Image
export async function addImage({ image, userId, path }: AddImageParams) {
    try {
        const author = await getUserById(userId);
        if (!author) {
            throw new Error("User not found");
        }
        const newImage = await db.image.create({
            data: {
                ...image,
                author: {
                    connect: {
                        id: author.id,
                    }
                }
            }
        })
        console.log(newImage)
        revalidatePath(path);
        return JSON.parse(JSON.stringify(newImage))
    } catch (error) {
        handleError(error);

    }
}
// UPDATE Image
export async function updateImage({ image, userId, path }: UpdateImageParams) {
    try {
        const imageToUpdate = await db.image.findUnique({
            where: {
                id: image._id
            }
        })
        if (!imageToUpdate || imageToUpdate.authorId !== userId) {
            throw new Error("Unauthorized or image not found");
        }
        const updatedImage = await db.image.update({
            where: {
                id: imageToUpdate.id
            },
            data: {
                ...image,
            }
        })
        revalidatePath(path);
        return JSON.parse(JSON.stringify(updateImage))
    } catch (error) {
        handleError(error);

    }
}
// DELETE Image
export async function deleteImage(imageId: string) {
    try {
        await db.image.delete({
            where:
            {
                id: imageId

            }
        })
    } catch (error) {
        handleError(error);

    } finally {
        redirect('/');
    }
}
// GET IMAGE
export async function getImageById(imageId: string) {
    try {
        const image = await getImageWithAuthor(imageId);
        if(!image) throw new Error("Image not found");
        return JSON.parse(JSON.stringify(image))
    } catch (error) {
        handleError(error);

    }
}