"use server";

import prisma from "@/lib/prismadb";

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
