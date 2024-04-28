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
import {
  pinPostByUserIdAndPostId,
  unpinPostByUserIdAndPostId,
} from "@/lib/data/profile";
import { Edit, EllipsisVertical, Pin, PinOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PostMenu({
  pinned,
  username,
  userId,
  postId,
}: {
  pinned: boolean;
  username: string;
  userId: string;
  postId: string;
}) {
  const router = useRouter();

  async function handlePinPost() {
    const res = await pinPostByUserIdAndPostId(userId, postId);

    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }

  async function handleUnpinPost() {
    const res = await unpinPostByUserIdAndPostId(userId, postId);

    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }

  async function handleDeletePost() {
    const res = await deletePostById(postId);

    if (res.success) {
      toast.success(res.message);
      router.replace(`/${username}/posts`);
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
            onClick={handlePinPost}
          >
            <Pin size={16} /> Pin Post to Profile
          </DropdownMenuItem>
        )}

        {pinned && (
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={handleUnpinPost}
          >
            <PinOff size={16} /> Unpin Post
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="cursor-pointer gap-2" asChild>
          <Link href={`/${username}/posts/${postId}/edit`}>
            <Edit size={16} /> Edit
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={handleDeletePost}
        >
          <Edit size={16} /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
