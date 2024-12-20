'use client'

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { get_active_inactive_users } from "@/redux/slices/dashboardSlice/getActiveInactiveUserSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { useDispatch } from "react-redux";

const ChartThree: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  
  const [user_count, setUserCount] = useState<number[]>([]);  
  const [user_details_name, setUserDetails_name] = useState<string[]>([]); 
  
  const user_details = useSelector((state: RootState) => state.ACTIVE_INACTIVE_USERS?.data[0]?.data);
  const user_details_success = useSelector((state: RootState) => state.ACTIVE_INACTIVE_USERS);

  useEffect(() => {
    dispatch(get_active_inactive_users())
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(get_active_inactive_users());
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    if (user_details_success?.isSuccess) {
      setUserCount(user_details?.[0] || []); 
      setUserDetails_name(user_details?.[1] || []); 
    }
  }, [user_details_success, user_details]);
  const options: ApexOptions = {
    chart: {
      fontFamily: "Poppins, sans-serif",
      type: "donut",
    },
    colors: ["#228B22", "#FF6347"],
    labels: user_details_name,
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Users",
              fontSize: "16px",
              fontWeight: "400",
              color:"#fff"
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "bold",
              color:"#ffffff"
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return user_details_success?.isError ? <h1>Something Went Wrong</h1> : (
    <div className="col-span-12 rounded-[10px] bg-cardBg px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-white dark:text-white">
           Active/Inactive Users
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={["Monthly", "Yearly"]} />
        </div>
      </div>

      <div className="mb-8">
        <div className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={user_count} type="donut" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[350px]">
        <div className="-mx-7.5 flex flex-wrap items-center justify-center gap-y-2.5">
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#228B22]"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-white dark:text-white-6">
                <span> Active </span>
                <span>{user_count[0]}</span>
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#FF6347]"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-white dark:text-white-6">
                <span> Inactive </span>
                <span>{user_count[1]}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
