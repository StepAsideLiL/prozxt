export default function Page({
  params,
}: {
  params: { username: string; post: string };
}) {
  return (
    <main>
      {params.username} {params.post}
    </main>
  );
}
