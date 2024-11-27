import React from 'react'
import Settings from "../../components/settings/Settings"
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings",
    description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const page = () => {
    return (
        <div>
            <DefaultLayout>
                <Settings />
            </DefaultLayout>
        </div>
    )
}

export default page