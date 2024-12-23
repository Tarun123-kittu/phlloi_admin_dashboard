'use client'

import React, { useState, useEffect } from 'react'
import CreatePagesModal from "../../modals/createPagesModal/CreatePagesModal"
import EditPagesModal from "../../modals/createPagesModal/EditPageModal"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { get_all_sections } from "../../redux/slices/pagesSlice/getAllSectionsSlice"
import Loader from "../loader/Loader"
import { useRouter } from 'next/navigation';

const AllPagesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [sectionId, setSectionId] = useState<string>("")
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
    const all_pages_list = useSelector((state: RootState) => state.ALL_SECTIONS);

    useEffect(() => {
        dispatch(get_all_sections())
    }, [])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.toLocaleString("en-US", { month: "long" });

        return `${day} ${month} ${year}`;
    };
    return (
        <div>
            {isOpen && <CreatePagesModal isOpen={isOpen} setIsOpen={setIsOpen} />}
            {editModalOpen && <EditPagesModal isOpen={editModalOpen} setIsOpen={setEditModalOpen} sectionId={sectionId} />}
            <div>
                <button onClick={() => setIsOpen(true)} type="button" className="text-black bg-hBgColor  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add New Section</button>
            </div>
            <div className="relative overflow-x-auto rounded-[10px]  bg-cardBg p-2 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700   dark:bg-gray-700 dark:text-gray-400">
                        <tr className='border-b dark[#fdfdfd3d] dark:[#fdfdfd3d]'>
                            <th scope="col" className="px-6 py-3 text-sm font-normal text-white">
                                Section name
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm font-normal text-white">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm font-normal text-white">
                                Pages Count
                            </th>
                            <th scope="col" className="px-6 py-3 text-sm font-normal text-white">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {all_pages_list?.isLoading ? <Loader /> : all_pages_list?.data?.map((pages_list, i) => {
                            return (
                                <tr key={i} className=" border-b border-[#fdfdfd3d] dark:[#fdfdfd3d]">
                                    <td scope="row" className="px-6 py-4 text-xs text-white whitespace-nowrap dark:text-white">
                                        {pages_list?.section}
                                    </td>
                                    <td className="px-6 py-4 text-white text-xs">
                                        {formatDate(pages_list?.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-white text-xs">
                                        {pages_list?.pages?.length}
                                    </td>
                                    <td
                                        className={`border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b`}

                                    >
                                        <div className='flex items-center gap-4'>
                                            <div onClick={() => router.push(`/view-page/${pages_list?._id}`)} title="View Details">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </div>
                                            <div title="Edit Details"
                                                onClick={() => { setSectionId(pages_list?._id); setEditModalOpen(true) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 40 40" className="size-6 cursor-pointer">
                                                    <path fill="#dff0fe" d="M5.982 29.309L8.571 26.719 13.618 31.115 10.715 34.019 2.453 37.547z"></path><path fill="#4788c7" d="M8.595,27.403l4.291,3.737l-2.457,2.457l-7.026,3.001l3.001-7.003L8.595,27.403 M8.548,26.036 l-2.988,2.988l-4.059,9.474L11,34.44l3.351-3.351L8.548,26.036L8.548,26.036z"></path><path fill="#4788c7" d="M3.805 33.13L1.504 38.5 6.888 36.201z"></path><path fill="#b6dcfe" d="M30.062,5.215L32.3,2.978C32.931,2.347,33.769,2,34.66,2s1.729,0.347,2.36,0.978 c1.302,1.302,1.302,3.419,0,4.721l-2.237,2.237L30.062,5.215z"></path><path fill="#4788c7" d="M34.66,2.5c0.758,0,1.471,0.295,2.007,0.831c1.107,1.107,1.107,2.907,0,4.014l-1.884,1.884 L30.77,5.215l1.884-1.884C33.189,2.795,33.902,2.5,34.66,2.5 M34.66,1.5c-0.982,0-1.965,0.375-2.714,1.124l-2.591,2.591 l5.428,5.428l2.591-2.591c1.499-1.499,1.499-3.929,0-5.428v0C36.625,1.875,35.643,1.5,34.66,1.5L34.66,1.5z"></path><g><path fill="#b6dcfe" d="M11.346,33.388c-0.066-0.153-0.157-0.308-0.282-0.454c-0.31-0.363-0.749-0.584-1.31-0.661 c-0.2-1.267-1.206-1.803-1.989-1.964c-0.132-0.864-0.649-1.342-1.201-1.582l21.49-21.503l4.721,4.721L11.346,33.388z"></path><path fill="#4788c7" d="M28.054,7.931l4.014,4.014L11.431,32.594c-0.242-0.278-0.638-0.59-1.261-0.748 c-0.306-1.078-1.155-1.685-1.983-1.943c-0.151-0.546-0.447-0.968-0.821-1.272L28.054,7.931 M28.053,6.517L5.56,29.023 c0,0,0.007,0,0.021,0c0.197,0,1.715,0.054,1.715,1.731c0,0,1.993,0.062,1.993,1.99c1.982,0,1.71,1.697,1.71,1.697l22.482-22.495 L28.053,6.517L28.053,6.517z"></path></g><g><path fill="#dff0fe" d="M29.107 4.764H34.685V11.440999999999999H29.107z" transform="rotate(-45.009 31.895 8.103)"></path><path fill="#4788c7" d="M31.507,4.477l4.014,4.014l-3.237,3.237L28.27,7.714L31.507,4.477 M31.507,3.063l-4.651,4.651 l5.428,5.428l4.651-4.651L31.507,3.063L31.507,3.063z"></path></g>
                                                </svg>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div >
    )
}

export default AllPagesList