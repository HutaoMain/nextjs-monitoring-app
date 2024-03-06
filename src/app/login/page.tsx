import GithubSignInButton from "@/components/GithubSignInButton";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginPage() {
  const session = await getServerSession(authConfig);

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col">
      <div className="w-[90%] p-2 border-[2px] border-black flex items-center flex-col md:p-5 md:w-[40%] md:h-[500px]">
        <h1 className="text-[50px] font-bold md:mt-20">Welcome</h1>
        <GoogleSignInButton />
        <GithubSignInButton />
      </div>
    </div>
  );
}
