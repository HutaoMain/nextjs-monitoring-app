"use client";

import { AlternateEmail, ArrowDropDown, ExitToApp } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    handleClose();
  };

  return (
    <div
      className="h-16 pl-40 fixed bg-gradient-to-r from-purple-400
      to-blue-500 w-full flex items-center justify-between"
    >
      <div className="w-full flex md:pr-[150px] justify-end">
        <IconButton onClick={handleClick}>
          <Avatar
            src={
              session?.user?.image ||
              "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
            }
            className="rounded-full w-[36px] h-[36px] object-cover"
          />
          <ArrowDropDown />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <AlternateEmail className="mr-2" />
            <span>{session?.user?.name}</span>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <ExitToApp className="mr-2" />
            <span>Sign Out</span>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
