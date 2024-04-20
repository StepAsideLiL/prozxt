"use client";

import { usePathname } from "next/navigation";
import { RxSlash } from "react-icons/rx";

export default function ProfileSubPage() {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const pagename = paths[2];

  if (paths.length < 3) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <RxSlash size={20} className="text-muted-foreground" />

      <p className="font-medium">
        {pagename[0].toUpperCase() + pagename.slice(1)}
      </p>
    </div>
  );
}
