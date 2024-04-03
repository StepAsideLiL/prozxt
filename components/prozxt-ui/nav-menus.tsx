"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logout from "@/components/prozxt-ui/logout";
import { User } from "lucide-react";
import Link from "next/link";

export function UserProfileSidebar({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  const menus = [
    {
      title: "Profile",
      href: `/${username}`,
      icon: User,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="space-y-6">
        <SheetHeader className="flex-row items-start gap-2 space-y-0">
          {children}

          <SheetTitle>{username}</SheetTitle>
        </SheetHeader>

        <section>
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="flex items-center gap-2 rounded p-2 text-sm hover:bg-muted/70"
            >
              <menu.icon size={20} /> {menu.title}
            </Link>
          ))}
        </section>

        <Logout />
      </SheetContent>
    </Sheet>
  );
}
