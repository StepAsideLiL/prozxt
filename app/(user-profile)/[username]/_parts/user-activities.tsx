import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserActivities } from "@/lib/data/user";
import Link from "next/link";

export default async function UserActivities({
  username,
}: {
  username: string;
}) {
  const activities = await getUserActivities(username);

  return (
    <section className="mx-auto flex max-w-3xl gap-5">
      {activities.map((activity) => (
        <Link href={activity.href} key={activity.title} className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>{activity.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-semibold">{activity.count}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
}
