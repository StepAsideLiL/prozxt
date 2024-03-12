import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prismadb";

export async function getCurrentUserCard() {
  const { user } = await validateRequest();

  try {
    if (user) {
      const currentUser = await prisma.user.findUnique({
        where: {
          username: user?.username,
        },
        select: {
          id: true,
          username: true,
          card: true,
        },
      });

      return currentUser;
    }

    return null;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to get ${user?.username} card info.`);
  }
}
