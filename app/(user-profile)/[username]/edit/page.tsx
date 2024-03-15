import ImgbbUploadForm from "./_parts/imgbb-upload-form";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data/user";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const profilePicture = {
    name: user.profilePicture?.title || "",
    mime: user.profilePicture?.mime || "",
    url: user.profilePicture?.url || "",
  };

  return (
    <main className="grid min-h-screen place-content-center">
      <ImgbbUploadForm profilePicture={profilePicture} />
    </main>
  );
}
