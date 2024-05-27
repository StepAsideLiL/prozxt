"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logout from "@/components/prozxt-ui/logout";
import { BriefcaseBusiness, Home, User } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  TbPencil,
  TbPencilPlus,
  TbSettings,
  TbSettingsPlus,
} from "react-icons/tb";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
        title: "Portfolio",
        href: `/${username}/portfolio`,
        icon: BriefcaseBusiness,
      },
      {
        title: "Posts",
        href: `/${username}/posts`,
        icon: TbPencil,
      },
      {
        title: "Projects",
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

export function HomeNav() {
  const menus = [
    {
      title: "Post",
      href: "/post",
    },
    {
      title: "Project",
      href: "/project",
    },
  ];

  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-[2px] border p-[2px]">
        {menus.map((menu) => (
          <li key={menu.href}>
            <Link
              href={menu.href}
              className={cn(
                "inline-block w-24 px-4 py-2 text-center hover:bg-muted/50",
                menu.href === pathname && "bg-muted hover:bg-muted",
              )}
            >
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
