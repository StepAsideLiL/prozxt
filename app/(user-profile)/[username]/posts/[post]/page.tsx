export default function Page({ params }: { params: { post: string } }) {
  return <main>{params.post}</main>;
}
