"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePostById } from "@/lib/data/post";
import { Edit, EllipsisVertical, Pin } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PostMenu({
  username,
  postId,
}: {
  username: string;
  postId: string;
}) {
  const router = useRouter();

  function handlePinPost() {}

  async function handleDeletePost() {
    const res = await deletePostById(postId);

    if (res.success) {
      toast.success(res.message);
      router.replace(`/${username}/posts`);
    } else {
      toast.error(res.message);
      revalidatePath(`/${username}/posts`);
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
        <DropdownMenuItem className="gap-2" onClick={handlePinPost}>
          <Pin size={16} /> Pin Post to Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2" asChild>
          <Link href={`/${username}/posts/${postId}/edit`}>
            <Edit size={16} /> Edit
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2" onClick={handleDeletePost}>
          <Edit size={16} /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
