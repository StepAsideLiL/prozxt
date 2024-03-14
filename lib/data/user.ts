"use server";

import prisma from "@/lib/prismadb";
import { validateRequest } from "@/lib/auth";

export async function getUser(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to get ${username}.`);
  }
}

export async function getCurrentUser() {
  try {
    const { user } = await validateRequest();

    if (user) {
      const currentUser = await prisma.user.findUnique({
        where: {
          username: user.username,
        },
        select: {
          id: true,
          username: true,
          profilePicture: true,
        },
      });

      return currentUser;
    }

    return null;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to get current user.`);
  }
}
