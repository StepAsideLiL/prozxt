"use server";

import prisma from "@/lib/prismadb";

export async function getUserProjectsByUsername(username: string) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        user: {
          username: username,
        },
      },
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
    });

    return projects;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user projects.");
  }
}

export async function getProjctById(projectId: string) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
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
        pinProjectFor: true,
      },
    });

    return project;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to to fetch project.");
  }
}

export async function deleteProjectById(projectId: string) {
  try {
    const post = await prisma.project.delete({
      where: {
        id: projectId,
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
    throw new Error("Failed to perform deleteProjectById function.");
  }
}
