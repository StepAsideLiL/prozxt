"use server";

import prisma from "@/lib/prismadb";

export async function pinPostByUserIdAndPostId(userId: string, postId: string) {
  try {
    const pinPost = await prisma.profile.upsert({
      where: {
        userId: userId,
      },
      update: {
        pinPost: {
          connect: {
            id: postId,
          },
        },
      },
      create: {
        user: {
          connect: {
            id: userId,
          },
        },
        pinPost: {
          connect: {
            id: postId,
          },
        },
      },
    });

    if (pinPost) {
      return {
        success: true,
        message: "The Post is Pinned!",
      };
    } else {
      return {
        success: false,
        message: "Failed to pin!",
      };
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to perform pinPostByUserIdAndPostId");
  }
}
