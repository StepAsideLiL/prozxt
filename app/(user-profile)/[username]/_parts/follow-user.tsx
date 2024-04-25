"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { followUser, unfollowUser } from "@/lib/data/user";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function FollowUser({
  isFollewing,
  userId,
  username,
  currentUserId,
}: {
  isFollewing: boolean;
  userId: string;
  username: string;
  currentUserId: string;
}) {
  const router = useRouter();

  async function handleFollowAction() {
    const res = await followUser(userId, currentUserId);

    if (res.success) {
      toast.success(`You are now following ${username}!`);
      router.refresh();
    } else {
      toast.error(`Failed to follow ${username}! Try again!`);
    }
  }

  async function handleUnfollowAction() {
    const res = await unfollowUser(userId, currentUserId);

    if (res.success) {
      toast.success(`You unfollowed ${username}!`);
      router.refresh();
    } else {
      toast.error(`Failed to unfollow ${username}! Try again!`);
    }
  }

  return (
    <>
      {!isFollewing && (
        <form action={handleFollowAction}>
          <Button>Follow</Button>
        </form>
      )}

      {isFollewing && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>Following</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Do You Want to Unfollow{" "}
                <span className="text-xl font-semibold">{username}</span>?
              </DialogTitle>
            </DialogHeader>

            <DialogFooter className="flex-row justify-between sm:justify-between">
              <form action={handleUnfollowAction}>
                <Button variant={"destructive"}>Unfollow</Button>
              </form>

              <DialogClose asChild>
                <Button variant={"outline"}>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
