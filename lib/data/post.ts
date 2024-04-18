"use server";

import prisma from "@/lib/prismadb";

export async function getUserPostsByUsername(username: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      select: {
        id: true,
        title: true,
        body: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            profilePicture: {
              select: {
                width: true,
                height: true,
                url: true,
              },
            },
          },
        },
      },
    });

    return posts;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user posts.");
  }
}
