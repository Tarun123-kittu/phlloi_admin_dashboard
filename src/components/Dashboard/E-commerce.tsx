"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";

const ECommerce: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  if (!localStorage.getItem('phloii_token')) {
    router.push("/")
  }
  return (
    <>
      <DataStatsOne />
      <div className="grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <div className="col-span-12 xl:col-span-7">
          <TableOne />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
