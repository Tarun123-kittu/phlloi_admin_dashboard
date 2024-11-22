import React from 'react'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProfileBox from "@/components/ProfileBox";
import VerificationList from "../../components/Tables/VerificationList";

export const metadata: Metadata = {
  title: "Verification Requests",
  description: "This is Next.js Profile page for NextAdmin Dashboard Kit",
};

const VarificationRequest = () => {
    return (
        <DefaultLayout>
          <div className="mx-auto w-full w-full">
            <Breadcrumb pageName="Varification Requests" />
    
            <VerificationList />
          </div>
        </DefaultLayout>
      );
}

export default VarificationRequest