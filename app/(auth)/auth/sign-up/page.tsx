import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "./_parts/sign-up-form";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen grid place-content-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Create an accout</CardTitle>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>

        <CardFooter>
          <p className="text-sm">
            Have an account?{" "}
            <Link href={"/auth/sign-in"} className="font-semibold underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
