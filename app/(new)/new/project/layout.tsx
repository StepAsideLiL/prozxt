import { NewEditHeader } from "@/components/prozxt-ui/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Project",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="border-b">
        <NewEditHeader title="New Project" />
      </div>

      {children}
    </>
  );
}
