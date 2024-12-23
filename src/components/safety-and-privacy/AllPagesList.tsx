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
                                            <div title="Delete Section"
                                                onClick={() => handleDeleteSection()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100" className="size-6 cursor-pointer">
                                                    <path fill="#f37e98" d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"></path><path fill="#f15b6c" d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"></path><path fill="#1f212b" d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"></path><path fill="#1f212b" d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"></path><path fill="#1f212b" d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"></path><path fill="#1f212b" d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"></path>
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