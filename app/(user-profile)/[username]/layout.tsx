import { NoUserHeader } from "@/components/prozxt-ui/headers";
import { isUserExist } from "@/lib/data/user";
import { RiUserForbidFill } from "react-icons/ri";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  const isExist = await isUserExist(params.username);

  if (!isExist) {
    return (
      <>
        <NoUserHeader />

        <main className="flex flex-col items-center justify-center gap-5 p-20">
          <h1 className="text-center text-2xl text-muted-foreground">
            No User Found
          </h1>
          <RiUserForbidFill size={30} className="fill-muted-foreground" />
        </main>
      </>
    );
  }

  return <>{children}</>;
}
