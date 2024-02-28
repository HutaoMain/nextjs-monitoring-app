"use client";

import { GitHub } from "@mui/icons-material";
// import { signIn } from "next-auth/react";

export default function GithubSignInButton() {
  const handleClick = () => {
    // signIn("github");
    console.log("github");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center 
            h-14 px-6 mt-4 text-xl transition-colors duration-300 
            bg-white border-2 border-black text-black rounded-lg 
            focus:shadow-outline hover:bg-slate-200"
    >
      <GitHub />
      <span className="ml-4">Continue with Github</span>
    </button>
  );
}
