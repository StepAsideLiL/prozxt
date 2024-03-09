"use server";

import * as bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";

type FormData = {
  username: string;
  password: string;
};

export async function signInUser(data: FormData) {
  const { username, password } = data;

  if (
    typeof username !== "string" ||
    username.length < 1 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }

  if (
    typeof password !== "string" ||
    password.length < 4 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await bcrypt.compare(
    password,
    existingUser.hashed_password
  );
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
