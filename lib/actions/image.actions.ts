"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { handleError } from "../utils";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";
import { v2 as cloudinary} from 'cloudinary';

const populateUser = async (imageId?: string) => {
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
                id: image.id
            }
        })
        if (!imageToUpdate || imageToUpdate.authorId !== userId) {
            throw new Error("Unauthorized or image not found");
        }
        const { id, ...imageWithoutId} = image;
        const updatedImage = await db.image.update({
            where: {
                id: imageToUpdate.id
            },
            data: {
                ...imageWithoutId,
            }
        })
        revalidatePath(path);
        return JSON.parse(JSON.stringify(updatedImage));
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
        const image = await populateUser(imageId);
        if(!image) throw new Error("Image not found");
        return JSON.parse(JSON.stringify(image))
    } catch (error) {
        handleError(error);

    }
}
export async function getImageUrl(imageId: string){
    try{
        
    }catch(error){
        handleError(error);
    }
}
// GET IMAGES
export async function getAllImages({ limit = 9, page = 1, searchQuery = '', userId} : {
    limit?: number;
    page: number;
    searchQuery?: string;
    userId: string;
}) {
    if (!userId) {
        throw new Error("User ID is required");
    }
    try {
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,

        })
        let expression = 'folder=pixelai'
        if(searchQuery){
            expression += ` AND ${searchQuery}`
        }
        console.log(searchQuery)
        const {resources} = await cloudinary.search.expression(expression).execute();
        const resourceIds = resources.map((resource: any) => resource.public_id);  
        const skipAmount = (Number(page) -1) * limit;
        const [images, totalImages] = await Promise.all([
            db.image.findMany({
                where: {
                    authorId: userId,
                    ...(resourceIds.length > 0 && {
                        publicId: {
                            in: resourceIds,
                        },
                    }),
                },
                orderBy: {
                    updatedAt: 'desc',
                },
                take: limit,
                skip: skipAmount,
            }),
            db.image.count({
                where: {
                    authorId: userId,
                    ...(resourceIds.length > 0 && {
                        publicId: {
                            in: resourceIds,
                        },
                    }),
                },
            }),
        ]);
        return {
            data: images,
            totalPages: Math.ceil(totalImages / limit),
        };

    } catch (error) {
        handleError(error);

    }
}