'use client'

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { user_monthly_joined } from "@/redux/slices/dashboardSlice/getUserMonthlyCount";
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';

interface DateRangeState {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string;
}



const ChartOne: React.FC = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear()
  const [count, setCounts] = useState<number[]>([]);
  const [label, setMonths] = useState<string[]>([]);
  const [weekly, setWeekly] = useState<boolean>(true);
  const [range, setRange] = useState<DateRangeState[]>([
    { startDate: undefined, endDate: undefined, key: "selection" },
  ]);
  const [start_date, setStart_date] = useState<string>("");
  const [end_date, setEnd_date] = useState<string>("");

  useEffect(() => {
    if (range[0]?.startDate && range[0]?.endDate) {
      setStart_date(format(range[0].startDate, "yyyy-MM-dd"));
      if (range[0].endDate !== range[0].startDate) {
        setEnd_date(format(range[0].endDate, "yyyy-MM-dd"));
      }
    }
  }, [range]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const handleSelect = (ranges: RangeKeyDict) => {
    setRange([
      {
        startDate: ranges.selection.startDate || new Date(),
        endDate: ranges.selection.endDate || new Date(), 
        key: "selection",
      },
    ]);
  };

  const user_monthly_data = useSelector(
    (state: RootState) => state.MONTHLY_JOINED_USER
  );

  useEffect(() => {
    dispatch(user_monthly_joined({ year: currentYear, weekly, startDate: start_date, endDate: end_date }));
  }, [dispatch, weekly, start_date && end_date]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(user_monthly_joined({ year: currentYear, weekly, startDate: start_date, endDate: end_date }));
    }, 1000000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    if (user_monthly_data?.isSuccess && user_monthly_data.data) {
      setCounts(user_monthly_data.data.userCounts || []);
      setMonths(user_monthly_data.data.label || []);
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
      zoom: {
        enabled: false, 
      },
      animations: {
        enabled: false, 
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
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      categories: label,
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
    },
  };

  const toggleDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const total = count?.reduce((sum, item) => sum + item, 0);

  const handleClickOutside = (event: MouseEvent) => {
    console.log("🟡 Click detected!", event.target);

    if (!dropdownRef.current) {
      console.log("❌ dropdownRef is NULL");
      return;
    }

    console.log("✅ dropdownRef is:", dropdownRef.current);

    if (!dropdownRef.current.contains(event.target as Node)) {
      console.log("🟥 Clicked outside dropdown, closing menu.");
      setIsOpen(false);
      setIsOpenDropdown(false);
    } else {
      console.log("🟢 Clicked inside dropdown.");
    }
  };


  useEffect(() => {
    console.log("Event listener added"); // Check if the listener is being added
    document.addEventListener("click", handleClickOutside);

    return () => {
      console.log("Event listener removed"); // Check if cleanup is happening
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (start_date && end_date) {
      setIsOpen(false)
      setIsOpenDropdown(false)
    }
  }, [start_date, end_date])

  return user_monthly_data?.isError ? <h1>Something Went Wrong</h1> : (
    <div className="col-span-12 rounded-[10px] bg-cardBg px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-medium text-white dark:text-white">
            New Joined User
          </h4>
        </div>
        {/* <div className="flex items-center gap-2.5">
          <DefaultSelectOption options={["Monthly", "Yearly"]} />
        </div> */}
        <div>

          <div className="relative w-55 text-right" ref={dropdownRef}>
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="bg-gray-800 inline-flex w-40 items-center placeholder:text-gray-5 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-gray-5 hover:bg-gray-800 dark:bg-gray-700 dark:text-white"
              type="button"

            >
              {!start_date && !end_date && weekly && "This Week"}
              {!start_date && !end_date && !weekly && "Monthly"}
              {start_date && end_date && start_date + "-" + end_date}

              <svg
                className="ml-auto h-2.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-50 ${isOpenDropdown ? "block" : "hidden"} mt-2 absolute w-full divide-y divide-gray-100 rounded-lg border border-[#fdfdfd3d] bg-cardBg shadow dark:bg-gray-700`}
              style={{ top: "100%" }}
            >
              <ul
                className="text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>

                  <button
                    onClick={() => {
                      setWeekly(true);
                      setStart_date("");
                      setEnd_date("");
                      setIsOpenDropdown(false);
                      setRange([
                        {
                          startDate: undefined, // ✅ Keep it as undefined initially
                          endDate: undefined, // ✅ Keep it as undefined initially
                          key: "selection",
                        },
                      ]);
                    }}
                    className="block px-4 py-2 text-gray-5  dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    This Week
                  </button>
                </li>
                <li className=" text-left">
                  <a
                    href="#"
                    onClick={() => {
                      setWeekly(false);
                      setStart_date("");
                      setEnd_date("");
                      setIsOpenDropdown(false);
                      setRange([
                        {
                          startDate: undefined, // ✅ Keep it as undefined initially
                          endDate: undefined, // ✅ Keep it as undefined initially
                          key: "selection",
                        },
                      ]);
                    }}
                    className="block px-4 py-2 text-gray-5  dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Monthly
                  </a>
                </li>
                <li className="relative border-b border-[#fdfdfd3d] text-left">
                  <a
                    href="#"
                    onClick={() => setIsOpen(!isOpen)}
                    className="block px-4 py-2 text-gray-500 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {start_date && end_date ? `${start_date} - ${end_date}` : "Select date range"}
                  </a>
                  {isOpen && (
                    <div ref={datePickerRef} className="absolute z-50 bg-gray-700 shadow-lg border rounded-lg">
                      <DateRange
                        ranges={
                          range[0].startDate && range[0].endDate
                            ? range
                            : [{ startDate: new Date(), endDate: new Date(), key: "selection" }] // ✅ Default to current date if undefined
                        }
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        rangeColors={["#FBC42E"]}
                      />
                    </div>
                  )}
                </li>

              </ul>
            </div>
          </div>
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
