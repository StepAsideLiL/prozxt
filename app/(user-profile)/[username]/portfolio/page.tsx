import { getUserPortfolioByUsername } from "@/lib/data/portfolio";
import UserPortfolio from "./_parts/user-portfolio";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserPortfolioByUsername(params.username);

  return (
    <main className="container space-y-10 py-3">
      {user?.portfolio?.body ? (
        <UserPortfolio content={user?.portfolio?.body} />
      ) : (
        <section className="flex justify-center">
          <Button variant={"outline"} asChild>
            <Link href={`/${params.username}/portfolio/edit`}>
              Add Portfolio
            </Link>
          </Button>
        </section>
      )}
    </main>
  );
}
