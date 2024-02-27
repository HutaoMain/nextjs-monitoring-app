import GoogleSignInButton from "@/components/GoogleSignInButton";
import React from "react";

export default function LoginPage() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col">
      <div className="border-[2px] border-black w-[40%] h-[500px] p-5 flex items-center flex-col gap-4">
        <h1 className="text-[50px] font-bold mt-20">Welcome</h1>
        <GoogleSignInButton />
      </div>
    </div>
  );
}
