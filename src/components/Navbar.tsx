"use client";

import { AlternateEmail } from "@mui/icons-material";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div
      className="h-16 pl-40 fixed bg-gradient-to-r from-purple-400
        to-blue-500 w-full flex items-center justify-between pr-5"
    >
      {/* <div className="flex px-5 items-center">
        <Search className="w-5 h-5 text-white" />
        <input
          type="text"
          placeholder="Search for jobs ..."
          className=" bg-transparent border-0 text-white placeholder-gray-200
                outline-none focus:ring-0 text-lg"
        />
      </div> */}
      <div className="w-full flex justify-end pr-[150px]">
        <div className="flex items-center text-white">
          <AlternateEmail className="w-7 h-7 text-white" />
          <h3 className="font-bold mr-3">{session?.user?.name}</h3>
          <img
            src={
              session?.user?.image ||
              "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
            }
            className="rounded-full w-[36px] h-[36px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
