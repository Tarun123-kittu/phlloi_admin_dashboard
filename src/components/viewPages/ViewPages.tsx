'use client'

import React, { useState, useEffect } from 'react';
import EditTextEditor from "../../components/safety-and-privacy/EditTextEditor"
import DeleteModal from '@/modals/deleteModal/deleteModal';
import { add_section, clear_add_section_state } from "../../redux/slices/pagesSlice/addSectionSlice"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { toast } from "react-hot-toast";
import { get_section_by_id, clear_section_state } from "../../redux/slices/pagesSlice/getSectionByIdSlice"
import { update_section, clear_update_section } from "../../redux/slices/pagesSlice/updatePageSlice"
import { get_all_sections } from "../../redux/slices/pagesSlice/getAllSectionsSlice"
import { delete_page, clear_deletePage_state } from "../../redux/slices/pagesSlice/deletePageSlice"
import { delete_section, clear_deleteSection_state } from "../../redux/slices/pagesSlice/deleteSectionSlice"
import { useRouter } from 'next/navigation';

interface ChangePasswordModalProps {
    sectionId: string
}

interface PagesArray {
    sectionId: string,
    _id: string;
    title: string;
    content: string;
    slug: string;
}



const ViewPages: React.FC<ChangePasswordModalProps> = ({ sectionId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const [sectionName, setSectionName] = useState<string>("")
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)
    const [isOpenDeleteSelectionModal, setIsOpenDeleteSelectionModal] = useState<boolean>(false)
    const [pageId, setPageId] = useState<string>("")
    const [textList, setTextList] = useState<PagesArray[]>([
        {
            _id: "",
            sectionId,
            title: "",
            content: "",
            slug: "",
        },
    ]);

    useEffect(() => {
        dispatch(get_section_by_id({ id: sectionId }))
    }, [sectionId])

    const section_details = useSelector((state: RootState) => state.SECTION_DETAILS);
    const is_page_deleted = useSelector((state: RootState) => state.DELETE_PAGE);
    const is_section_deleted = useSelector((state: RootState) => state.DELETE_SECTION);
    const update_section_data = useSelector((state: RootState) => state.UPDATE_PAGE);
    console.log(update_section_data, "this is the update pgae section")


    const handleAddOneMorePage = () => {
        const newRow = {
            _id: "",
            sectionId: sectionId,
            title: "",
            content: "",
            slug: "",
        };
        setTextList((prev) => [...prev, newRow]);
    };

    const handleRemoveIndex = (indexToRemove: number) => {
        setTextList((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSetValues = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        val: string
    ) => {
        setTextList((prev) =>
            prev.map((item, idx) =>
                idx === index
                    ? {
                        ...item,
                        [val]: e.target.value,
                    }
                    : item
            )
        );
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        for (let i = 0; i < textList?.length; i++) {
            if (textList[i].title === "") {
                toast.error("Title are required to create new page")
                return
            }
            if (textList[i].slug === "") {
                toast.error("Slug are required to create new page")
                return
            }
            if (textList[i].content === "") {
                toast.error("Content are required to create new page")
                return
            }
        }
        dispatch(update_section({ sectionId: sectionId, section: sectionName, pages: textList }))
    }

    useEffect(() => {
        if (section_details?.isSuccess) {
            setSectionName(section_details?.data?.section ?? "")
            const value: any = section_details?.data?.pages
            setTextList(value)
        }
        if (section_details?.isError) {
            // toast.error()
            dispatch(clear_add_section_state())
        }
    }, [section_details])

    useEffect(() => {
        if (is_page_deleted?.isSuccess) {
            toast.success("Page deleted successfully")
            dispatch(clear_deletePage_state())
            dispatch(get_section_by_id({ id: sectionId }))
            setIsOpenDeleteModal(false)
        }
    }, [is_page_deleted])

    useEffect(() => {
        if (is_section_deleted?.isSuccess) {
            toast.success("Section deleted successfully")
            dispatch(clear_deleteSection_state())
            dispatch(get_all_sections())
        }
    }, [is_section_deleted])


    const handleDeletePage = (id: string) => {
        setPageId(id)
        setIsOpenDeleteModal(true)
    }

    const handleDeleteSection = () => {
        setIsOpenDeleteSelectionModal(true)
    }

    const deletePages = () => {
        dispatch(delete_page({ id: pageId }))
    }

    const deleteSection = () => {
        dispatch(delete_section({ id: sectionId }))
    }

    useEffect(() => {
        if (update_section_data?.isSuccess) {
            dispatch(get_section_by_id({ id: sectionId }))
            toast.success("Page updated successfully")
            dispatch(clear_update_section())
        }
    }, [update_section_data])




    return (
        <>
            {(
                <div
                    
                >
                    {section_details?.isSuccess && <div className="">
                        {isOpenDeleteModal && <DeleteModal isModalOpen={isOpenDeleteModal} setIsModalOpen={setIsOpenDeleteModal} handleDelete={deletePages} />}
                        {isOpenDeleteSelectionModal && <DeleteModal isModalOpen={isOpenDeleteSelectionModal} setIsModalOpen={setIsOpenDeleteSelectionModal} handleDelete={deleteSection} />}
                        <div className=" bg-cardBg rounded-lg shadow dark:bg-gray-700 p-8 scroll-smooth overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                            <h1 className='font-medium text-2xl text-white mb-3'>View Section</h1>
                            <div className="mb-6">
                                <label htmlFor="section-name" className="block mb-2 text-sm font-medium text-white dark:text-white">Section name</label>
                                <input
                                    type="text"
                                    id="section-name"
                                    value={sectionName}
                                    onChange={(e) => setSectionName(e.target.value)}
                                    className="bg-black text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className='text-right'>
                                <button onClick={() => handleAddOneMorePage()} type="button" className="text-center text-sm font-medium text-black rounded  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] w-20 h-10 ml-auto">Add Page</button>

                            </div>
                            {/* <svg onClick={() => handleDeleteSection()} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg> */}
                            {Array.isArray(textList) && textList?.length > 0 && textList.map((list, index) => (
                                <div key={index} className='mb-4 mt-3'>
                                    <div className='flex justify-end gap-3' title='View Page' onClick={() => router.push(`/${list.slug}`)}>
                                        {/* <svg onClick={() => handleRemoveIndex(index)} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg> */}
                                        {/* <svg onClick={() => handleDeletePage(list?._id)} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </div>


                                    <div className="mb-6">
                                        <label htmlFor={`page-name-${index}`} className="block mb-2 text-sm font-medium text-white dark:text-white">Page name</label>
                                        <input
                                            type="text"
                                            id={`page-name-${index}`}
                                            value={list.title}
                                            onChange={(e) => handleSetValues(e, index, "title")}
                                            className="bg-black text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor={`slug-${index}`} className="block mb-2 text-sm font-medium text-white dark:text-white">Slug</label>
                                        <input
                                            type="text"
                                            id={`slug-${index}`}
                                            value={list.slug}
                                            onChange={(e) => handleSetValues(e, index, "slug")}
                                            className="bg-black text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <EditTextEditor setTextList={setTextList} index={index} textList={textList} />
                                </div>
                            ))}
                            <div className='flex gap-3'>
                                {/* <button
                                    onClick={() => setIsOpen(false)}
                                    className=" w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-cardBg text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button> */}
                                {!section_details?.isLoading ? <button onClick={(e) => handleSave(e)} type="button" className="text-center text-sm font-medium text-black rounded  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] w-20 h-10 ml-auto">Update</button> :
                                    <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#fff" />
                                        </svg>
                                        Loading...
                                    </button>}
                            </div>
                        </div>
                    </div>}
                </div>
            )}
        </>
    );
};

export default ViewPages;
