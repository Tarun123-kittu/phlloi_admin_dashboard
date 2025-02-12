import React from 'react'
import AllRooms from '@/components/settings/AllRooms'
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phloii rooms list",
  description: "All rooms list",
};

const page = () => {
  return (
    <div>
        <DefaultLayout>
            <AllRooms />
        </DefaultLayout>
        </div>
  )
}

export default page