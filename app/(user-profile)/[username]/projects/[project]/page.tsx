export default function Page({ params }: { params: { project: string } }) {
  return <main>{params.project}</main>;
}
