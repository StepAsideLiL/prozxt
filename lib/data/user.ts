"use server";

import prisma from "@/lib/prismadb";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isUserExist(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user) {
      return true;
    } else {
      false;
    }
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to check if user exists.`);
  }
}

export async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
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

export async function followUser(followerId: string, followingId: string) {
  try {
    const follow = await prisma.follow.create({
      data: {
        followerId: followerId,
        followingId: followingId,
      },
    });

    if (follow) {
      return {
        success: true,
        message: "Followed successfully!",
      };
    } else {
      return {
        success: false,
        message: "Failed to follow!",
      };
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to perform follow user function.");
  }
}

export async function unfollowUser(followerId: string, followingId: string) {
  try {
    const unfollow = await prisma.follow.deleteMany({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });

    if (unfollow) {
      return {
        success: true,
        message: "Unfollowed successfully!",
      };
    } else {
      return {
        success: false,
        message: "Failed to unfollow!",
      };
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to perform unfollowUser function.");
  }
}

export async function isCurrentUserFollowingProfileUser(
  followerId: string,
  followingId: string,
) {
  try {
    const isFollowing = await prisma.follow.findFirst({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });

    if (isFollowing) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    throw new Error(
      "Failed to perform isCurrentUserFollowingProfileUser function.",
    );
  }
}
