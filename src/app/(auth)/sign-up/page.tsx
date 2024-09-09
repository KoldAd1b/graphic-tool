import { redirect } from "next/navigation";

import { auth } from "@/auth";

import SignUpCard from "@/features/auth/components/sign-up-card";

const SignInPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return <SignUpCard />;
};

export default SignInPage;
