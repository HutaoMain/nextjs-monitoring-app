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
      <div className="border-[2px] border-black w-[40%] h-[500px] p-5 flex items-center flex-col">
        <h1 className="text-[50px] font-bold mt-20">Welcome</h1>
        <GoogleSignInButton />
        <GithubSignInButton />
      </div>
    </div>
  );
}
