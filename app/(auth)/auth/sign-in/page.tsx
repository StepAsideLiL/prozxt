import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SignInForm from "./_parts/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function Page() {
  return (
    <main className="min-h-screen grid place-content-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>

        <CardContent>
          <SignInForm />
        </CardContent>

        <CardFooter>
          <p className="text-sm">
            Don&apos;t Have an account?{" "}
            <Link href={"/auth/sign-up"} className="font-semibold underline">
              Create an accout
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
