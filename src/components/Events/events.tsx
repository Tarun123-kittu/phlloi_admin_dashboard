'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import { get_all_events } from '@/redux/slices/eventsSlice/getAllEvents';
import Loader from "../loader/Loader";

const Events = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [eventsList, setEventsList] = useState<any>([])
    console.log(eventsList, "this is the events list")
    const all_rooms_state = useSelector((state: RootState) => state.GET_ALL_EVENTS)

    useEffect(() => {
        dispatch(get_all_events())
    }, [])

    useEffect(() => {
        if (all_rooms_state?.isSuccess) {
            setEventsList(all_rooms_state?.events?.events)
        }
        if (all_rooms_state?.isError) {
            setEventsList([])
        }
    }, [all_rooms_state])

    function formatDate(isoDate: string) {
        const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0'); // Ensure 2 digits
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getUTCFullYear();

        return `${day}/${month}/${year}`;
    }

    function convertTo12HourFormat(time: string) {
        let [hours, minutes] = time.split(":").map(Number);
        let period = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12; // Convert 0 to 12 for midnight
        return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
    }


    return (
        <div>
            <div className="rounded-[10px] bg-[#0E0E0E]">
                {/* Table Header */}
                <div className="p-4 md:px-6 xl:px-9 border-b border-white">
                    <h4 className="text-body-2xlg font-bold text-white dark:text-white">
                        Events List
                    </h4>
                </div>
                <div className="grid grid-cols-7 sm:grid-cols-9 border-b border-white p-4 md:px-6 2xl:px-7.5">
                    <div className="col-span-2 flex items-center">
                        <p className="font-medium text-white">Event Name</p>
                    </div>
                    <div className="col-span-2 hidden sm:flex items-center">
                        <p className="font-medium text-white">Establishment Name</p>
                    </div>
                    <div className="col-span-2 hidden sm:flex items-center">
                        <p className="font-medium text-white">Description</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium text-white">Start At</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium text-white">End At</p>
                    </div>
                </div>

                {/* Table Rows */}
                {all_rooms_state?.isLoading ? <td colSpan={7} className='h-80 text-center'><Loader /></td> : eventsList?.length === 0 ? <td className="h-60 flex items-center justify-center" colSpan={7}>
                    <h1 className="text-center text-white">No Data Found</h1>
                </td> : Array.isArray(eventsList) &&
                eventsList.map((event) => (
                    <div
                        key={event?._id}
                        className="grid grid-cols-7 sm:grid-cols-9 border-t border-stroke p-4 md:px-6 2xl:px-7.5"
                    >
                        {/* Event Name */}
                        <div className="col-span-2 flex items-center">
                            <p className="text-body-sm font-medium text-white dark:text-dark-6">
                                {event?.eventTitle}
                            </p>
                        </div>

                        {/* Establishment Name */}
                        <div className="col-span-2 hidden sm:flex items-center">
                            <p className="text-body-sm font-medium text-white dark:text-dark-6">
                                {event?.establishmentName}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="col-span-2 hidden sm:flex items-center">
                            <p title={event?.eventDescription} className="text-body-sm font-medium text-white dark:text-dark-6">
                                {event?.eventDescription?.length > 20 ? event?.eventDescription?.slice(0, 20) + "..." : event?.eventDescription}
                            </p>
                        </div>

                        {/* Start At */}
                        <div className="col-span-1 flex items-center">
                            <p className="text-body-sm font-medium text-white dark:text-dark-6">
                                {formatDate(event?.eventStart?.date)} at {convertTo12HourFormat(event?.eventStart?.time)}
                            </p>
                        </div>

                        {/* End At */}
                        <div className="col-span-1 flex items-center">
                            <p className="text-body-sm font-medium text-white dark:text-dark-6">
                                {formatDate(event?.eventEnd?.date)} at {convertTo12HourFormat(event?.eventEnd?.time)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Events