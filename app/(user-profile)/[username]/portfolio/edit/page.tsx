import { getUserPortfolioByUsername } from "@/lib/data/portfolio";
import EditPortfolioForm from "./_parts/edit-portfolio-form";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { user } = await validateRequest();
  const userPortfolio = await getUserPortfolioByUsername(params.username);

  if (user?.username !== params.username) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="container space-y-10 py-3">
      <EditPortfolioForm
        userId={user!.id}
        content={userPortfolio?.portfolio?.body}
      />
    </main>
  );
}
