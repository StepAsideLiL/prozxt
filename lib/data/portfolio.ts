"use server";

import prisma from "@/lib/prismadb";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";

type UpdatePortfolioData = {
  userId: string;
  portfolioBody: SerializedEditorState<SerializedLexicalNode> | string;
};

export async function getUserPortfolioByUsername(username: string) {
  try {
    const portfolio = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        portfolio: {
          select: {
            id: true,
            body: true,
          },
        },
      },
    });

    return portfolio;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get portfolio.");
  }
}

export async function updatePortfolio(data: UpdatePortfolioData) {
  try {
    const portfolio = await prisma.portfolio.upsert({
      where: {
        userId: data.userId,
      },
      update: {
        body: JSON.stringify(data.portfolioBody),
      },
      create: {
        body: JSON.stringify(data.portfolioBody),
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });

    if (portfolio) {
      return {
        success: true,
        message: "Successfully updated!",
      };
    } else {
      return {
        success: true,
        message: "Failed to updat!",
      };
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get update.");
  }
}
