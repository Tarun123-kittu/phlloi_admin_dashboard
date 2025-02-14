'use client'

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { secret_dating_monthly_joined } from "@/redux/slices/dashboardSlice/secretDatingChartSlice";



const ChartTwo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentYear = new Date().getFullYear()
  const [count, setCounts] = useState<number[]>([]);
  const [months, setMonths] = useState<string[]>([]);


  const secret_dating_data = useSelector(
      (state: RootState) => state.SECRET_DATING_USER
    );

  useEffect(() => {
    dispatch(secret_dating_monthly_joined({ year: currentYear }));
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(secret_dating_monthly_joined({ year: currentYear }));
    }, 500000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    if (secret_dating_data?.isSuccess) {
      setCounts(secret_dating_data?.data?.userCounts || []);
      setMonths(secret_dating_data?.data?.months || []);
    }
  }, [secret_dating_data]);

  const series = [
    {
      name: "secret dating",
      data: count,
    },
  ];

  const options: ApexOptions = {
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Poppins, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
  
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },
  
    grid: {
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  
    xaxis: {
      categories: months,
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return Math.round(value).toString(); // Convert to string to match expected type
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Poppins",
      fontWeight: 500,
      fontSize: "14px",
      markers: {
        radius: 99,
        width: 16,
        height: 16,
        strokeWidth: 10,
        strokeColor: "transparent",
      },
    },
    fill: {
      opacity: 1,
    },
  };
  

  return secret_dating_data?.isError ? <h1>Something Went Wrong</h1> : (
    <div className="col-span-12 rounded-[10px] bg-cardBg px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-medium text-white dark:text-white">
            Secret Dating User
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={["This Week", "Last Week"]} />
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-3.5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={370}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
