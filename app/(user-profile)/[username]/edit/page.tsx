import ImgbbUploadForm from "./_parts/imgbb-upload-form";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data/user";
import { validateRequest } from "@/lib/auth";

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
    <main className="grid min-h-screen place-content-center">
      <ImgbbUploadForm profilePicture={profilePicture} />
    </main>
  );
}
