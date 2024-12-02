'use client'

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { get_all_dashboard_rooms } from "@/redux/slices/dashboardSlice/getAllRooms";

const TableOne = () => {
  const dispatch = useDispatch<AppDispatch>();
  const room_state_data = useSelector((state:RootState) => state.DASHBOARD_ROOMS)

  useEffect(() => {
    dispatch(get_all_dashboard_rooms());
  },[dispatch])

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(get_all_dashboard_rooms());
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return room_state_data?.isError ? <h4>Please wait currently facing some issue</h4>  : (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Rooms List
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-3">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Room Image
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              User Joined
            </h5>
          </div>
        </div>

        {room_state_data?.data?.map((room, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${key === room_state_data?.data?.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
              }`}
            key={key}
          >
            <div className="flex items-center justify-between gap-5 px-2 py-4">
              <div className="flex-shrink-0">
                <img src={room.image} className="rounded-2xl" alt="Brand" width={48} height={48} />
              </div>
              {/* <p className="hidden font-medium text-dark dark:text-white sm:block">
                {room.room}
              </p> */}
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {room.room}
              </p>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {room.joined_user_count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
