import React from 'react'
import Settings from "../../components/settings/Settings"
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
    title: "Settings",
    description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const page = () => {
    return (
        <div>
            <DefaultLayout>
                <div className="mx-auto w-full">
                    {/* <Breadcrumb pageName="Settings" /> */}
                    <Settings />
                </div>
            </DefaultLayout>
        </div>
    )
}

export default page