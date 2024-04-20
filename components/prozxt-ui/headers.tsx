import React, { Suspense } from "react";
import ModeToggle from "@/components/prozxt-ui/mode-toggle";
import { Logo } from "@/components/prozxt-ui/logo";
import { getCurrentUser, getUserByUsername } from "@/lib/data/user";
import { UserProfileSidebar } from "@/components/prozxt-ui/nav-menus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserAvatarSkeleton,
  UserProfileAvatarSkeleton,
} from "@/components/prozxt-ui/skeletons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { validateRequest } from "@/lib/auth";
import ProfileSubPage from "./client-components";
import { RxSlash } from "react-icons/rx";

export function HomeHeader() {
  return (
    <div className="border-b">
      <header className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-5">
          <Logo size={24} variant="link" />

          <h1 className="font-semibold">Home</h1>
        </div>

        <div className="flex items-center gap-5">
          <ModeToggle />
          <Suspense fallback={<UserAvatarSkeleton />}>
            <UserAvatarSidebar />
          </Suspense>
        </div>
      </header>
    </div>
  );
}

export function NoUserHeader() {
  return (
    <div className="border-b">
      <header className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-5">
          <Logo size={24} variant="link" />
        </div>

        <div className="flex items-center gap-5">
          <ModeToggle />
          <Suspense fallback={<UserAvatarSkeleton />}>
            <UserAvatarSidebar />
          </Suspense>
        </div>
      </header>
    </div>
  );
}

export function NewEditHeader({ title }: { title?: string }) {
  return (
    <header className="container flex items-center justify-between py-3">
      <div className="flex items-center gap-5">
        <Logo size={24} variant="link" />

        {title && <h1 className="font-semibold">{title}</h1>}
      </div>

      <div className="flex items-center gap-5">
        <ModeToggle />
        <Suspense fallback={<UserAvatarSkeleton />}>
          <UserAvatarSidebar />
        </Suspense>
      </div>
    </header>
  );
}

export function ProfileHeader({ username }: { username: string }) {
  return (
    <div className="bg-muted/25">
      <header className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-5">
          <Logo size={24} variant="link" />

          <RxSlash size={20} className="text-muted-foreground" />

          <Suspense fallback={<UserProfileAvatarSkeleton />}>
            <UserProfileAvatar username={username} />
          </Suspense>

          <ProfileSubPage />
        </div>

        <div className="flex items-center gap-5">
          <ModeToggle />
          <Suspense fallback={<UserAvatarSkeleton />}>
            <UserAvatarSidebar />
          </Suspense>
        </div>
      </header>
    </div>
  );
}

async function UserProfileAvatar({ username }: { username: string }) {
  const user = await getUserByUsername(username);

  return (
    <Link href={`/${username}`} className="flex items-center gap-3">
      <Avatar className="h-7 w-7 cursor-pointer">
        <AvatarImage src={user?.profilePicture?.url} />
        <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>

      <h1>{username}</h1>
    </Link>
  );
}

async function UserAvatarSidebar() {
  const { user } = await validateRequest();
  const currentUser = await getCurrentUser(user?.id);

  if (!user) {
    return (
      <>
        <Button asChild>
          <Link href={"/auth/sign-up"}>Sign Up</Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link href={"/auth/sign-in"}>Sign In</Link>
        </Button>
      </>
    );
  }

  return (
    <UserProfileSidebar username={user.username}>
      <Avatar className="cursor-pointer">
        <AvatarImage src={currentUser?.profilePicture?.url} />
        <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
    </UserProfileSidebar>
  );
}
