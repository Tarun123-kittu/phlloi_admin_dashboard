'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import { get_all_events } from '@/redux/slices/eventsSlice/getAllEvents';
import Loader from "../loader/Loader";
import Pagination from '../pagination/pagination';
import ViewEventModal from '@/modals/roomsModal/ViewEventModal';

const Events = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [eventsList, setEventsList] = useState<any>([])
    const [page, setPage] = useState<number>(1);
    const all_rooms_state = useSelector((state: RootState) => state.GET_ALL_EVENTS)
    const [openAddRoom, setOpenAddRoom] = useState(false)
    const [selectedEvent,setSelectedEvent] = useState<any>()

    useEffect(() => {
        dispatch(get_all_events({ page }))
    }, [page])

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
        const day = String(date.getUTCDate()).padStart(2, '0'); 
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const year = date.getUTCFullYear();

        return `${day}/${month}/${year}`;
    }

    function convertTo12HourFormat(time: string) {
        let [hours, minutes] = time.split(":").map(Number);
        let period = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;
        return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
    }

    return (
        <div className="rounded-[10px] bg-[#0E0E0E] p-4">
            <h4 className="text-body-2xlg font-bold text-white mb-4">Events List</h4>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-left">
                            <th className="min-w-[220px] border-b border-[#fdfdfd3d] px-4 py-4 text-sm font-medium text-white dark:text-white xl:pl-7.5">Event Name</th>
                            <th className="min-w-[220px] border-b border-[#fdfdfd3d] px-4 py-4 text-sm font-medium text-white dark:text-white xl:pl-7.5">Establishment Name</th>
                            <th className="min-w-[220px] border-b border-[#fdfdfd3d] px-4 py-4 text-sm font-medium text-white dark:text-white xl:pl-7.5">Description</th>
                            <th className="min-w-[220px] border-b border-[#fdfdfd3d] px-4 py-4 text-sm font-medium text-white dark:text-white xl:pl-7.5">Start At</th>
                            <th className="min-w-[220px] border-b border-[#fdfdfd3d] px-4 py-4 text-sm font-medium text-white dark:text-white xl:pl-7.5">End At</th>
                            <th className='border-b border-[#fdfdfd3d]'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {all_rooms_state?.isLoading ? (
                            <tr>
                                <td colSpan={5} className='h-80 text-center'><Loader /></td>
                            </tr>
                        ) : eventsList?.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="h-60 text-center">No Data Found</td>
                            </tr>
                        ) : (
                            Array.isArray(eventsList) && eventsList.map((event) => (
                                <tr key={event?._id} className="">
                                    <td className="border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 xl:pl-7.5 text-white text-xs">{event?.eventTitle}</td>
                                    <td className=" border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 xl:pl-7.5 text-white text-xs">{event?.establishmentName}</td>
                                    <td className="border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 xl:pl-7.5 text-white text-xs" title={event?.eventDescription}>
                                        {event?.eventDescription?.length > 20 ? event?.eventDescription?.slice(0, 20) + "..." : event?.eventDescription}
                                    </td>
                                    <td className="border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 xl:pl-7.5 text-white text-xs">{formatDate(event?.eventStart?.date)} at {convertTo12HourFormat(event?.eventStart?.time)}</td>
                                    <td className="border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 xl:pl-7.5 text-white text-xs">{formatDate(event?.eventEnd?.date)} at {convertTo12HourFormat(event?.eventEnd?.time)}</td>
                                    <td onClick={() => {setOpenAddRoom(true) ; setSelectedEvent(event)}} className="border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 xl:pl-7.5 text-white text-xs cursor-pointer">view</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {all_rooms_state && !all_rooms_state?.isError &&
                    all_rooms_state?.events?.totalEvents > 1 && (
                        <Pagination
                            totalPages={all_rooms_state?.events?.totalPages || 0}
                            currentPage={all_rooms_state?.events?.currentPage}
                            setPage={setPage}
                        />
                    )}
            </div>
            {openAddRoom && <ViewEventModal isOpen={openAddRoom} setIsOpen={setOpenAddRoom} value={selectedEvent}/>}
        </div>
    )
}

export default Events
