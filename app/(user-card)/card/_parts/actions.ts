"use server";

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

type AddCardData = {
  name: string;
  title: string;
  icons: string;
  socials: string;
};

export async function addCardData(data: AddCardData) {
  const { name, title, socials, icons } = data;

  try {
    const { user } = await validateRequest();
    if (user) {
      const card = await prisma.card.upsert({
        where: { userId: user?.id },
        create: {
          name: name,
          title: title,
          icons: icons,
          socials: socials,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
        update: {
          name: name,
          title: title,
          icons: icons,
          socials: socials,
        },
      });

      if (card) {
        revalidatePath("/card");
        return {
          status: "success",
          message: "Card is updated successfully.",
        };
      }
    }

    return {
      status: "error",
      message: "Failed to update Card.",
    };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to add or modify user card data");
  }
}
