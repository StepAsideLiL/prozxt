import { ProfileHeader } from "@/components/prozxt-ui/headers";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  return (
    <>
      <ProfileHeader username={params.username} />

      {children}
    </>
  );
}
