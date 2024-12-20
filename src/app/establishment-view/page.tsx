import React from 'react'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProfileBox from "@/components/ProfileBox";
import EstablishmentList from '@/components/Tables/EstablismentList';

export const metadata: Metadata = {
  title: "Verification Requests",
  description: "This is Next.js Profile page for NextAdmin Dashboard Kit",
};

const EstblishmentVerification = () => {
    return (
        <DefaultLayout>
          <div className="mx-auto w-full w-full">
            {/* <Breadcrumb pageName="Varification Requests" /> */}
    
            <EstablishmentList />
          </div>
        </DefaultLayout>
      );
}

export default EstblishmentVerification