"use server";

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { ImgbbFormData } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function modifyCurrentUserProfilePicture(data: ImgbbFormData) {
  const {
    imgbbId,
    title,
    url,
    imgbbUrl,
    deleteUrl,
    width,
    height,
    mime,
    size,
    time,
  } = data;

  try {
    const { user } = await validateRequest();

    const profilePicture = await prisma.image.upsert({
      where: {
        userId: user?.id,
      },
      create: {
        imgbbId,
        title,
        url,
        imgbbUrl,
        deleteUrl,
        width,
        height,
        mime,
        size,
        time,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
      update: {
        imgbbId,
        title,
        url,
        imgbbUrl,
        deleteUrl,
        width,
        height,
        mime,
        size,
        time,
      },
    });

    if (profilePicture) {
      revalidatePath(`/${user?.username}/edit`);
      return {
        status: "success",
        message: "Profile picture is updated.",
      };
    }

    return {
      status: "error",
      message: "Profile picture is updated.",
    };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to save current user profile picture");
  }
}
