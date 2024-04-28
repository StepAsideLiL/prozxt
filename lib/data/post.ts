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

export async function getPostById(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
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
        pinPostFor: true,
      },
    });

    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post.");
  }
}

export async function deletePostById(postId: string) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (post) {
      return {
        success: true,
        message: "Successfully deleted!",
      };
    } else {
      return {
        success: false,
        message: "Failed to delete!",
      };
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to perform deletePostById function.");
  }
}
