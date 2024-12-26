"use client";
import Link from "next/link";
import React from "react";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full flex">
        <div className="h-screen	hidden lg:block  w-2/4	relative after:content-[''] after:absolute after:inset-0 after:bg-[#0000004d] after:backdrop-blur-sm after:filter after:blur-md">
          <img src="/images/login_image.png" className="h-full w-full object-cover" alt="login" />
        </div>
        <div className="w-full lg:w-2/4	h-screen p-3	bg-black">
          <SigninWithPassword />
        </div>
      </div>
    </div>
  );
}
