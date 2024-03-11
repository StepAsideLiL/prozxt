import { getUserCard } from "@/lib/data/user";

export default async function CardContent({ username }: { username: string }) {
  const user = await getUserCard(username);

  return <div>{username} Card Content</div>;
}
