import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";
import AllPagesList from "../../components/safety-and-privacy/AllPagesList"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
    title: "Privacy and safety",
    description: "This is Next.js Settings page for NextAdmin Dashboard Kit",
};

const page = () => {
    return (
        <DefaultLayout>
            <div className="mx-auto w-full">
                <Breadcrumb pageName="Safety And Privacy" />
                <AllPagesList />
            </div>
        </DefaultLayout>
    )
}

export default page