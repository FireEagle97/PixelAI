"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { handleError } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const createGuestSession = async () => {
  const guestEmail = `guest+${Date.now()}-${Math.random().toString(36).slice(2, 8)}@pixelai.local`;
  const guestPassword = `Guest-${crypto.randomUUID()}`;

  try {
    const hashedPassword = await bcrypt.hash(guestPassword, 10);

    await db.user.create({
      data: {
        name: "Guest User",
        email: guestEmail,
        password: hashedPassword,
      },
    });
  } catch (error) {
    handleError(error);
    redirect("/login?error=GuestCreateFailed");
  }

  await signIn("credentials", {
    email: guestEmail,
    password: guestPassword,
    redirectTo: "/dashboard",
  });
};
