"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSignUp } from "../hooks/use-sign-up";
import { TriangleAlert } from "lucide-react";

type Props = {};

const SignUpCard = (props: Props) => {
  const mutation = useSignUp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onProviderSignIn = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: "/" });
  };

  const onCredentialSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
          });
        },
      }
    );
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0 ">
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      {!!mutation.error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>Something went wrong</p>
        </div>
      )}
      <CardDescription>
        Use your email or use any of the options to continue
      </CardDescription>
      <CardContent className="space-y-5 px-0 pb-6">
        <form onSubmit={onCredentialSignUp} className="space-y-2.5">
          <Input
            disabled={mutation.isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            required
          />
          <Input
            disabled={mutation.isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={mutation.isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            min={6}
            required
          />
          <Button
            disabled={mutation.isPending}
            className="w-full"
            type="submit"
            size="lg"
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className="gap-2 flex flex-col ">
          <Button
            disabled={mutation.isPending}
            onClick={() => onProviderSignIn("github")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FaGithub className="mr-2 size-5 top-2 left-2.5 absolute " />
            Continue with github
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={() => onProviderSignIn("google")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            <FaGoogle className="mr-2 size-5 top-2 left-2.5 absolute " />
            Continue with google
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Already have an account?
          <Link href={"/sign-in"}>
            <span className="text-sky-700 hover:underline">Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
