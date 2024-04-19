import Logout from "@/components/prozxt-ui/logout";
import { validateRequest } from "@/lib/auth";
import { getUserByUsername } from "@/lib/data/user";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const userInfo = await getUserByUsername(params.username);
  const { user } = await validateRequest();

  return (
    <main>
      {userInfo ? (
        <h1>{userInfo.username}</h1>
      ) : (
        <p className="text-muted-foreground">No User</p>
      )}
      {user?.username === userInfo?.username ? (
        <h1>same</h1>
      ) : (
        <p className="text-muted-foreground">Not same</p>
      )}
      {user && <Logout />}
    </main>
  );
}
