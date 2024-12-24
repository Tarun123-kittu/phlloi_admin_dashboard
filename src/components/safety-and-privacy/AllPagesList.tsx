'use client'

import React, { useState, useEffect } from 'react'
import CreatePagesModal from "../../modals/createPagesModal/CreatePagesModal"
import EditPagesModal from "../../modals/createPagesModal/EditPageModal"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { get_all_sections } from "../../redux/slices/pagesSlice/getAllSectionsSlice"
import Loader from "../loader/Loader"
import { useRouter } from 'next/navigation';
import DeleteModal from '@/modals/deleteModal/deleteModal';
import { delete_section, clear_deleteSection_state } from "../../redux/slices/pagesSlice/deleteSectionSlice"
import toast from 'react-hot-toast';
const AllPagesList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [sectionId, setSectionId] = useState<string>("")
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
    const [isOpenDeleteSelectionModal, setIsOpenDeleteSelectionModal] = useState<boolean>(false)
    const all_pages_list = useSelector((state: RootState) => state.ALL_SECTIONS);
    const is_section_deleted = useSelector((state: RootState) => state.DELETE_SECTION);

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

    const handleDeleteSection = () => {
        setIsOpenDeleteSelectionModal(true)
    }

    const deleteSection = () => {
        dispatch(delete_section({ id: sectionId }))
    }

    useEffect(() => {
        if (is_section_deleted?.isSuccess) {
            toast.success("Section deleted successfully")
            dispatch(clear_deleteSection_state())
            dispatch(get_all_sections())
            setIsOpen(false)
        }
        if (is_section_deleted?.isError) {
            toast.error("Something went wrong.")
            dispatch(clear_deleteSection_state())
        }
    }, [is_section_deleted])
    return (
        <div>
            {isOpen && <CreatePagesModal isOpen={isOpen} setIsOpen={setIsOpen} />}
            {editModalOpen && <EditPagesModal isOpen={editModalOpen} setIsOpen={setEditModalOpen} sectionId={sectionId} />}
            <div className='text-right'>
                <button onClick={() => setIsOpen(true)} type="button" className="text-black bg-gradient-to-r from-[#fbb90d] to-[#22ebff]  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add New Section</button>
            </div>
            <div className="relative overflow-x-auto rounded-[10px]  bg-cardBg p-2 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700   dark:bg-gray-700 dark:text-gray-400">
                        <tr className='border-b border-[#fdfdfd3d] dark:[#fdfdfd3d]'>
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
                        {all_pages_list?.isLoading ? <tr><td className='h-60 relative' colSpan={4}> <Loader /> </td></tr> : all_pages_list?.data?.map((pages_list, i) => {
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
                                            <div onClick={() => router.push(`/view-page/${pages_list?._id}`)} title="View section">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </div>
                                            <div title="Edit section"
                                                onClick={() => { setSectionId(pages_list?._id); setEditModalOpen(true) }}>
                                               <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.06 6L12 6.94L2.92 16H2V15.08L11.06 6ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z" fill="#666C78"/>
                                                </svg>


                                            </div>
                                            <div title="Delete Section"
                                                onClick={() => handleDeleteSection()}>
                                               <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 5H17M7 9V15M11 9V15M2 5L3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5" stroke="#666C78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
            {isOpenDeleteSelectionModal && <DeleteModal isModalOpen={isOpenDeleteSelectionModal} setIsModalOpen={setIsOpenDeleteSelectionModal} handleDelete={deleteSection} />}
        </div >
    )
}

export default AllPagesList