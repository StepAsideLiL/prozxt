"use server";

import { lucia } from "@/lib/auth";
import prisma from "@/lib/prismadb";
import * as bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormData = {
  username: string;
  password: string;
};

export async function createUser(data: FormData) {
  const { username, password } = data;

  if (
    typeof username !== "string" ||
    username === "info" ||
    username.length < 1 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username.",
    };
  }

  if (
    typeof password !== "string" ||
    password.length < 4 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username: username,
      hashed_password: hashedPassword,
    },
  });

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
