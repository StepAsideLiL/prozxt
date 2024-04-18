import React, { Suspense } from "react";
import ModeToggle from "@/components/prozxt-ui/mode-toggle";
import { Logo } from "@/components/prozxt-ui/logo";
import { getCurrentUser } from "@/lib/data/user";
import { UserProfileSidebar } from "@/components/prozxt-ui/nav-menus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserAvatarSkeleton } from "@/components/prozxt-ui/skeletons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { validateRequest } from "@/lib/auth";

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
