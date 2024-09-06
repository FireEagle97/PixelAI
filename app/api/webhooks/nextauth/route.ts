// import { NextRequest} from "next/server";
// import { NextApiResponse } from "next";
// import { getToken } from "next-auth/jwt";
// import { createUser, deleteUser, updateUser, updateUserMetadata } from "@/lib/actions/user.actions";

// export async function POST(req: NextRequest, res: NextApiResponse) {
//     const SECRET = process.env.NEXTAUTH_SECRET;

//     if (!SECRET) {
//         throw new Error("Please add NEXTAUTH_SECRET to .env");
//     }

//     const body = await req.text();
//     const signature = req.headers.get("x-nextauth-signature");
//     const timestamp = req.headers.get("x-nextauth-timestamp")

//     // Verify the signature
//     const verified = await getToken({
//         req,
//         secret: SECRET,
//         raw: true,
//     });
//     if (!verified || verified !== signature) {
//         console.error("Error verifying webhook");
//         return res.status(400).json({ message: 'Error verifying webhook'});
//     }

//     // Parse the event
//     const eventType = req.headers.get("x-nextauth-event")
//     const eventPayload = JSON.parse(body);

//     // CREATE
//     if (eventType === "user.created") {
//         const { id, email_addresses, image_url, first_name, last_name, username } = eventPayload;

//         const user = {
//             userId: id,
//             email: email_addresses[0].email_address,
//             username: username!,
//             firstName: first_name,
//             lastName: last_name,
//             photo: image_url,
//         };
//         const newUser = await createUser(user);

//         // Update user metadata if necessary (assuming you have a similar function)
//         if (newUser) {
//             await updateUserMetadata(newUser.id, {
//                 userId: newUser._id,
//             });
//         }

//         return res.status(200).json({ message: "OK", user: newUser });
//     }
//     // UPDATE
//     if (eventType === "user.updated") {
//         const { id, image_url, first_name, last_name, username } = eventPayload;

//         const user = {
//             firstName: first_name,
//             lastName: last_name,
//             username: username!,
//             photo: image_url,
//         };

//         const updatedUser = await updateUser(id, user);

//         return res.json({ message: "OK", user: updatedUser });
//     }

//     // DELETE
//     if (eventType === "user.deleted") {
//         const { id } = eventPayload.id;

//         const deletedUser = await deleteUser(id!);

//         return res.json({ message: "OK", user: deletedUser });
//     }
//     console.log(`Webhook with and ID of ${eventPayload.id} and type of ${eventType}`);
//     console.log("Webhook body:", body);
//     return res.status(200).json({ message: "Event not handled" });

// }