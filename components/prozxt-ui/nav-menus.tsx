"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logout from "@/components/prozxt-ui/logout";
import { Home, User } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  TbPencil,
  TbPencilPlus,
  TbSettings,
  TbSettingsPlus,
} from "react-icons/tb";

export function UserProfileSidebar({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  const menus = {
    profiles: [
      {
        title: "Home",
        href: `/`,
        icon: Home,
      },
      {
        title: "Profile",
        href: `/${username}`,
        icon: User,
      },
      {
        title: "Posts",
        href: `/${username}/posts`,
        icon: TbPencil,
      },
      {
        title: "Profile",
        href: `/${username}/projects`,
        icon: TbSettings,
      },
    ],
    newPost: [
      {
        title: "New Post",
        href: "/new/post",
        icon: TbPencilPlus,
      },
      {
        title: "New Project",
        href: "/new/project",
        icon: TbSettingsPlus,
      },
    ],
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="space-y-3">
        <SheetHeader className="flex-row items-start gap-2 space-y-0">
          {children}

          <SheetTitle>{username}</SheetTitle>
        </SheetHeader>

        <Separator />

        <section className="space-y-2">
          <div>
            {menus.profiles.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className="flex items-center gap-2 rounded p-2 text-sm hover:bg-muted/70"
              >
                <menu.icon size={20} /> {menu.title}
              </Link>
            ))}
          </div>

          <Separator />

          <div>
            {menus.newPost.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className="flex items-center gap-2 rounded p-2 text-sm hover:bg-muted/70"
              >
                <menu.icon size={20} /> {menu.title}
              </Link>
            ))}
          </div>

          <Logout />
        </section>
      </SheetContent>
    </Sheet>
  );
}