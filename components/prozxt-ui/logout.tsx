import { Button } from "@/components/ui/button";
import { logout } from "@/lib/data/user";

export default function Logout() {
  return (
    <form action={logout}>
      <Button>Sign Out</Button>
    </form>
  );
}
