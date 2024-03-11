import CardContent from "./_parts/card-content";

export default function Page({ params }: { params: { username: string } }) {
  return (
    <main className="min-h-screen grid place-content-center">
      <CardContent username={params.username} />
    </main>
  );
}
