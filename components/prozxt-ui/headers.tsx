import React, { Suspense } from "react";
import ModeToggle from "@/components/prozxt-ui/mode-toggle";
import { Logo } from "@/components/prozxt-ui/logo";
import { getCurrentUser } from "@/lib/data/user";
import { UserProfileSidebar } from "@/components/prozxt-ui/nav-menus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserAvatarSkeleton } from "@/components/prozxt-ui/skeletons";

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
          <UserAvatarSidebar />
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
        <UserAvatarSidebar />
      </div>
    </header>
  );
}

async function UserAvatarSidebar() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <Suspense fallback={<UserAvatarSkeleton />}>
      <UserProfileSidebar username={user.username}>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.profilePicture?.url} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </UserProfileSidebar>
    </Suspense>
  );
}
