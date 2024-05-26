import ImgbbUploadForm from "./_parts/imgbb-upload-form";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data/user";
import { validateRequest } from "@/lib/auth";
import UserProfileInfoForm from "./_parts/user-profile-info-form";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  const { user } = await validateRequest();
  const currentUser = await getCurrentUser(user?.id);

  if (!user) {
    redirect("/auth/sign-in");
  }

  const profilePicture = {
    name: currentUser?.profilePicture?.title || "",
    mime: currentUser?.profilePicture?.mime || "",
    url: currentUser?.profilePicture?.url || "",
  };

  return (
    <main className="container space-y-10 py-3">
      <ImgbbUploadForm profilePicture={profilePicture} />

      <Separator className="mx-auto max-w-3xl" />

      <UserProfileInfoForm userId={user.id} username={user.username} />
    </main>
  );
}
