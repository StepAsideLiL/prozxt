"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  pinProjectByUserIdAndProjectId,
  unpinProjectByUserIdAndProjectId,
} from "@/lib/data/profile";
import { deleteProjectById } from "@/lib/data/project";
import { Edit, EllipsisVertical, Pin, PinOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProjectMenu({
  pinned,
  username,
  userId,
  projectId,
}: {
  pinned: boolean;
  username: string;
  userId: string;
  projectId: string;
}) {
  const router = useRouter();

  async function handlePinProject() {
    const res = await pinProjectByUserIdAndProjectId(userId, projectId);

    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }

  async function handleUnpinProject() {
    const res = await unpinProjectByUserIdAndProjectId(userId, projectId);

    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }

  async function handleDeleteProject() {
    const res = await deleteProjectById(projectId);

    if (res.success) {
      toast.success(res.message);
      router.replace(`/${username}/projects`);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <EllipsisVertical />
          <span className="sr-only">Options</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {!pinned && (
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={handlePinProject}
          >
            <Pin size={16} /> Pin Project to Profile
          </DropdownMenuItem>
        )}

        {pinned && (
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={handleUnpinProject}
          >
            <PinOff size={16} /> Unpin Project
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="cursor-pointer gap-2" asChild>
          <Link href={`/${username}/posts/${projectId}/edit`}>
            <Edit size={16} /> Edit
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={handleDeleteProject}
        >
          <Edit size={16} /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
