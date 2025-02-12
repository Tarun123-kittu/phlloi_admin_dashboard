'use client'

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { user_monthly_joined } from "@/redux/slices/dashboardSlice/getUserMonthlyCount";

const ChartOne: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentYear = new Date().getFullYear()
  const [count, setCounts] = useState<number[]>([]);
  const [months, setMonths] = useState<string[]>([]);

  const user_monthly_data = useSelector(
    (state: RootState) => state.MONTHLY_JOINED_USER
  );

  useEffect(() => {
    dispatch(user_monthly_joined({ year: currentYear }));
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(user_monthly_joined({ year: currentYear }));
    }, 1000000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    if (user_monthly_data?.isSuccess && user_monthly_data.data) {
      setCounts(user_monthly_data.data.userCounts || []);
      setMonths(user_monthly_data.data.months || []);
    }
  }, [user_monthly_data]);
  const series = [
    {
      name: "users",
      data: count,
    },

  ];

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Poppins, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
    },

    markers: {
      size: 0,
    },
    grid: {
      strokeDashArray: 5,
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
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function (e) {
            return "";
          },
        },
      },
      marker: {
        show: !1,
      },
    },
    xaxis: {
      type: "category",
      categories: months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      labels: {
        formatter: function (value: number) {
          return Math.round(value).toString();
        },
      },
    }
    
    
  };

  const total = count?.reduce((sum, item) => sum + item, 0);

  return user_monthly_data?.isError ? <h1>Something Went Wrong</h1> : (
    <div className="col-span-12 rounded-[10px] bg-cardBg px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-medium text-white dark:text-white">
            Monthly Joined User
          </h4>
        </div>
        <div className="flex items-center gap-2.5">
          <DefaultSelectOption options={["Monthly", "Yearly"]} />
        </div>
      </div>
      <div>
        <div className="-ml-4 -mr-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
