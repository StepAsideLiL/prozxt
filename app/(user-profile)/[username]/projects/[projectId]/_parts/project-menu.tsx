"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProjectById } from "@/lib/data/project";
import { Edit, EllipsisVertical, Pin } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProjectMenu({
  username,
  projectId,
}: {
  username: string;
  projectId: string;
}) {
  const router = useRouter();

  function handlePinProject() {}

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
