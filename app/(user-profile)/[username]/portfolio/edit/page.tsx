import { getUserPortfolioByUsername } from "@/lib/data/portfolio";
import EditPortfolioForm from "./_parts/edit-portfolio-form";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserPortfolioByUsername(params.username);

  return (
    <main className="container space-y-10 py-3">
      <EditPortfolioForm userId={user!.id} content={user?.portfolio?.body} />
    </main>
  );
}
