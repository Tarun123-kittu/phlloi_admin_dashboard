import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import SignIn from "@/components/Auth/Signin/"


export const metadata: Metadata = {
  title:
    "Phloii Admin Dashboard",
  description: "Phloii Admin Dashboard",
};

export default function Home() {
  return (
    <>
        <SignIn />
    </>
  );
}
