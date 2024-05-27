import { Badge } from "@/components/ui/badge";
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
      <Link href={`/${username}/portfolio`} className="w-full">
        <Card>
          <CardContent className="p-3 font-medium">Your Portfolio</CardContent>
        </Card>
      </Link>
      {activities.map((activity) => (
        <Link href={activity.href} key={activity.title} className="w-full">
          <Card>
            <CardContent className="flex items-center gap-5 p-3 font-medium">
              <p>Your {activity.title}</p>
              <Badge variant={"outline"}>{activity.count}</Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
}
