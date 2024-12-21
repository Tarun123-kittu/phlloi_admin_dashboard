'use client'

import React, { useState, useEffect } from 'react'
import CreatePagesModal from "../../modals/createPagesModal/CreatePagesModal"
import EditPagesModal from "../../modals/createPagesModal/EditPageModal"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { get_all_sections } from "../../redux/slices/pagesSlice/getAllSectionsSlice"
import Loader from "../loader/Loader"

const AllPagesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false)
    const [sectionId,setSectionId] = useState<string>("")
    const [editModalOpen,setEditModalOpen] = useState<boolean>(false)
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
            {editModalOpen && <EditPagesModal isOpen={editModalOpen} setIsOpen={setEditModalOpen} sectionId={sectionId}/>}
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
                                        title="View Details"
                                        onClick={() => {setSectionId(pages_list?._id);setEditModalOpen(true)}}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default AllPagesList