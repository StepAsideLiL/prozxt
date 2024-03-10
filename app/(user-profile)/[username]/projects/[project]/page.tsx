export default function Page({
  params,
}: {
  params: { username: string; project: string };
}) {
  return (
    <main>
      {params.username} {params.project}
    </main>
  );
}
