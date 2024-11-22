import React from 'react'
import ECommerce from "@/components/Dashboard/E-commerce"
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const page = () => {
  return (
    <div>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </div>
  )
}

export default page