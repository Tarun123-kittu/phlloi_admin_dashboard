import React from 'react'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserDetails from "../../../components/user_details/userDetails"

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
    title: "User Details",
    description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const page = ({ params }: { params: { id: string } }) => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="User Details" />

            <div className="flex flex-col gap-10">
                <div>
                    <UserDetails id={params.id}/>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default page