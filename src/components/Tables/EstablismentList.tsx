'use client'
import React, { useState, useEffect } from 'react'
import UserFilter from "../filters/userFilter"
import Pagination from "../pagination/pagination"
import Loader from "../loader/Loader"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { useRouter } from "next/navigation";
import { get_all_hotel_verification_requests, clear_hotel_varification_details_state } from '@/redux/slices/hotelSlice/getAllHotelVerificationRequests'



const EstablishmentList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState([])
    const [showVerifiedHotel, setShowVerifiedHotel] = useState<boolean>(false)
    const router = useRouter()

    const verification_hotel_requests = useSelector((state: RootState) => state.ALL_VARIFICATION_HOTELS);
    console.log(verification_hotel_requests)

    useEffect(() => {
        dispatch(get_all_hotel_verification_requests({ showVerifiedHotel, page }))
    }, [page, showVerifiedHotel])

    const formatDate = (dateString: number) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    useEffect(() => {
        if (verification_hotel_requests.isSuccess && verification_hotel_requests.hotels) {
            const allRequests: any = verification_hotel_requests.hotels.requests;
            setData(allRequests); // Set the hotel requests
        }
    }, [verification_hotel_requests]);
    return (
        <div>
            <div className="rounded-[10px] border border-stroke bg-cardBg p-2 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                <div className='flex justify-end items-center'>
                    <div className="form-check mr-3">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={showVerifiedHotel} onChange={() => setShowVerifiedHotel(!showVerifiedHotel)} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            verified
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={!showVerifiedHotel} onChange={() => setShowVerifiedHotel(!showVerifiedHotel)} />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            Not verified
                        </label>
                    </div>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-left ">
                                <th className="min-w-[220px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white xl:pl-7.5 text-sm">
                                    Establishment Name
                                </th>
                                <th className="min-w-[120px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white text-sm">
                                    Establishment Type

                                </th>
                                <th className="min-w-[120px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white text-sm">
                                    Country
                                </th>
                                <th className="min-w-[120px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white text-sm">
                                    State
                                </th>
                                <th className="min-w-[120px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white text-sm">
                                    Pin/Zip Code

                                </th>
                                <th className="min-w-[120px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white text-sm">
                                    Action

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {verification_hotel_requests?.isLoading ? <td className="h-60 relative" colSpan={6}><Loader /></td> : Array?.isArray(data) && data?.map((data: any, index: number) => (
                                <tr key={index}>
                                    <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b">
                                        <h5 className="text-white dark:text-white">{data?.establishmentName}</h5>
                                    </td>
                                    <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b">
                                        <p className="text-white dark:text-white">{data?.establishmentType}</p>
                                    </td>
                                    <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b">
                                        <p className="text-white dark:text-white">{data?.address?.country}</p>
                                    </td>
                                    <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b">
                                        <p className="text-white dark:text-white">{data?.address?.state}</p>
                                    </td>
                                    <td
                                        className={`border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b`}
                                        title="View Details"
                                    >
                                        <p className="text-white dark:text-white">{data?.address?.pinCode}</p>
                                    </td>
                                    <td
                                        className={`border-[#fdfdfd3d] border-b px-4 py-4 dark:border-dark-3 `}
                                        title="View Details"
                                        onClick={() => router.push(`/establishment-view/${data?._id}`)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {verification_hotel_requests?.hotels?.currentPage !== undefined && verification_hotel_requests?.hotels?.totalPages > 1 && (
                        <Pagination
                            totalPages={verification_hotel_requests?.hotels?.totalPages || 0}
                            currentPage={verification_hotel_requests?.hotels?.currentPage || 0}
                            setPage={setPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default EstablishmentList;
