"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, EllipsisVertical, Pin } from "lucide-react";
import Link from "next/link";

export default function ProjectMenu({
  username,
  projectId,
}: {
  username: string;
  projectId: string;
}) {
  function handlePinProject() {}

  function handleDeleteProject() {}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <EllipsisVertical />
          <span className="sr-only">Options</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem className="gap-2" onClick={handlePinProject}>
          <Pin size={16} /> Pin Project to Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2" asChild>
          <Link href={`/${username}/posts/${projectId}/edit`}>
            <Edit size={16} /> Edit
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2" onClick={handleDeleteProject}>
          <Edit size={16} /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
