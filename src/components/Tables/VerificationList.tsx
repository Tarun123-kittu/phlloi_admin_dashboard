'use client'
import React, { useState, useEffect } from 'react'
import UserFilter from "../filters/userFilter"
import Pagination from "../pagination/pagination"
import Loader from "../loader/Loader"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { VerificationListAPI } from "../../redux/slices/userVerificationSlice/getAllVerificationRequests"
import { useRouter } from "next/navigation";

export interface Pagination {
    currentPage: number;
    totalPages: number;
}

export interface UserData {
    _id : string;
    username: string;
    dob: number;
    gender: string;
    online_status: boolean;
}

export interface UserState {
    isLoading: boolean;
    error: string | null;
    isSuccess: boolean;
    isError: boolean;
    verification_data: {
        pagination: Pagination;
        users: UserData[];
    } | null;
}

const VerificationList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState<number>(1);
    const router = useRouter()

    const verificationListData = useSelector((state: RootState) => state.VERIFICATION_LIST);
    console.log(verificationListData,"this is the verification list")

    useEffect(() => {
        dispatch(VerificationListAPI({ page }))
    }, [page])

    const formatDate = (dateString: number) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };
    return (
        <div>
            <div className="rounded-[10px]  bg-cardBg p-2 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-left">
                                <th className="min-w-[220px] px-4 border-[#fdfdfd3d] border-b py-4 font-medium text-white dark:text-white xl:pl-7.5 text-sm">
                                    Username
                                </th>
                                <th className="min-w-[120px] px-4 border-[#fdfdfd3d] border-b py-4 font-medium text-white dark:text-white text-sm">
                                    DOB
                                </th>
                                <th className="min-w-[120px] px-4 border-[#fdfdfd3d] border-b py-4 font-medium text-white dark:text-white text-sm">
                                    Gender
                                </th>
                                <th className="min-w-[120px] px-4 border-[#fdfdfd3d] border-b py-4 font-medium text-white dark:text-white text-sm">
                                    Online Status
                                </th>
                                <th className="min-w-[120px] px-4 border-[#fdfdfd3d] border-b py-4 font-medium text-white dark:text-white text-sm">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {verificationListData?.isLoading ? <td className="h-60 relative" colSpan={5}><Loader /></td> : verificationListData?.error === "No user found" ? <td className="h-60 relative" colSpan={5}><h1 className='text-white text-center'>No Data Found</h1></td> : verificationListData?.verification_data?.users?.map((data: UserData, index: number) => (
                                <tr key={index}>
                                    <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b">
                                        <h5 className="text-dark dark:text-white">{data?.username}</h5>
                                    </td>
                                    <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b">
                                        <p className="text-dark dark:text-white">{formatDate(data.dob)}</p>
                                    </td>
                                    <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b">
                                        <p className="text-dark dark:text-white">{data?.gender}</p>
                                    </td>
                                    <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b">
                                        <p className="text-dark dark:text-white">{data.online_status ? "True" : "False"}</p>
                                    </td>
                                    <td
                                        className={`border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b`}
                                         title="View Details"
                                         onClick={() => router.push(`/user_details/${data?._id}`)}
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
                    {verificationListData?.verification_data?.pagination?.currentPage !== undefined && verificationListData?.verification_data?.pagination?.totalPages > 1 && (
                        <Pagination
                            totalPages={verificationListData?.verification_data?.pagination?.totalPages || 0}
                            currentPage={verificationListData?.verification_data?.pagination?.currentPage || 0}
                            setPage={setPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default VerificationList;
