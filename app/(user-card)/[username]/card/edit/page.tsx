export default function Page({ params }: { params: { username: string } }) {
  return <main>{params.username} Card edit</main>;
}
