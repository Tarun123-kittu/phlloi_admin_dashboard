import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import EstablishmentView from "@/components/establishmentView/EstablishmentView";

export const metadata: Metadata = {
  title: "Hotel Verification",
  description: "This is Next.js Profile page for NextAdmin Dashboard Kit",
};

const EstblishmentVerification = ({ params }: { params: { hotelId: string } }) => {
  const { hotelId } = params
  return (
    <DefaultLayout>
      <EstablishmentView hotelId={hotelId} />
    </DefaultLayout>
  );
};

export default EstblishmentVerification;
