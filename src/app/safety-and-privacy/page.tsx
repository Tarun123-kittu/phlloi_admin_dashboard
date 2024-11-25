import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";
import AllPagesList from "../../components/safety-and-privacy/AllPagesList"

export const metadata: Metadata = {
    title: "Privacy and safety",
    description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const page = () => {
    return (
        <DefaultLayout>
            <AllPagesList />
        </DefaultLayout>
    )
}

export default page