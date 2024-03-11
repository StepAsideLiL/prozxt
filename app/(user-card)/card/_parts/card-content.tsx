import { getUserCard } from "@/lib/data/user";
import { redirect } from "next/navigation";

export default async function CardContent() {
  const user = await getUserCard();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return <div>{user?.username} Card Content</div>;
}
