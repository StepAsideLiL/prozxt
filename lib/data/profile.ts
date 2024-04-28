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

export async function pinProjectByUserIdAndProjectId(
  userId: string,
  projectId: string,
) {
  try {
    const pinProject = await prisma.profile.upsert({
      where: {
        userId: userId,
      },
      update: {
        pinProject: {
          connect: {
            id: projectId,
          },
        },
      },
      create: {
        user: {
          connect: {
            id: userId,
          },
        },
        pinProject: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    if (pinProject) {
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
    throw new Error("Failed to perform pinProjectByUserIdAndProjectId");
  }
}

export async function getUserPinsByUsername(username: string) {
  try {
    const pins = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        profile: {
          select: {
            pinPost: {
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
            },
            pinProject: {
              select: {
                id: true,
                title: true,
                body: true,
                tags: true,
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
            },
          },
        },
      },
    });

    return pins;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to perform getUserPinsByUsername.");
  }
}

export async function unpinPostByUserIdAndPostId(
  userId: string,
  postId: string,
) {
  try {
    const unpin = await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        pinPost: {
          disconnect: {
            id: postId,
          },
        },
      },
    });

    if (unpin) {
      return {
        success: true,
        message: "Successfully unpinned!",
      };
    } else {
      return {
        success: false,
        message: "Failed to unpin!",
      };
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to perform unpinPostByUserIdAndPostId.");
  }
}
