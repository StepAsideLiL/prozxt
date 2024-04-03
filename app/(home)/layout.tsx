import { HomeHeader } from "@/components/prozxt-ui/headers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeHeader />

      {children}
    </>
  );
}
