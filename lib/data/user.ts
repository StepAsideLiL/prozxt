"use server";

import prisma from "@/lib/prismadb";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export async function getCurrentUser(userID: string | undefined) {
  try {
    if (userID) {
      const currentUser = await prisma.user.findUnique({
        where: {
          id: userID,
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

export async function logout() {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}
