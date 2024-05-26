import ImgbbUploadForm from "./_parts/imgbb-upload-form";
import { redirect } from "next/navigation";
import { getUserProfileEditFormData } from "@/lib/data/user";
import { validateRequest } from "@/lib/auth";
import UserProfileInfoForm from "./_parts/user-profile-info-form";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/auth/sign-in");
  }
  const profile = await getUserProfileEditFormData(user.id);

  const profilePicture = {
    name: profile?.profilePictureName || "",
    mime: profile?.profilePictureMime || "",
    url: profile?.profilePictureUrl || "",
  };

  const profileInfo = {
    userId: user.id,
    username: user.username,
    name: profile?.name || "",
    showProfessionalStatus: profile?.showProfessionalStatus || false,
    professionalStatus: profile?.professionalStatus || "",
  };

  return (
    <main className="container space-y-10 py-3">
      <ImgbbUploadForm profilePicture={profilePicture} />

      <Separator className="mx-auto max-w-3xl" />

      <UserProfileInfoForm profileInfo={profileInfo} />
    </main>
  );
}
