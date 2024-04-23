import { getUserPortfolioByUsername } from "@/lib/data/portfolio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { validateRequest } from "@/lib/auth";
import { Edit } from "lucide-react";
import LexicalReadonly from "@/components/lexical-rte/lexical-readonly";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { user } = await validateRequest();
  const userPortfolio = await getUserPortfolioByUsername(params.username);

  return (
    <main className="container space-y-10 py-3">
      {userPortfolio?.portfolio?.body ? (
        <section className="mx-auto max-w-3xl space-y-6">
          {user?.username === params.username && (
            <Button variant={"outline"} asChild>
              <Link
                href={`/${params.username}/portfolio/edit`}
                className="gap-1"
              >
                <Edit size={16} /> Edit
              </Link>
            </Button>
          )}

          <LexicalReadonly content={userPortfolio.portfolio.body} />
        </section>
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
