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
import EditPagesModal from '@/modals/createPagesModal/EditPageModal';

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
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
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

    return (
        <>
            {(
                <div

                >
                    <div className='mb-4'>
                        <img onClick={() => router.push("/pages")} src="https://img.icons8.com/?size=100&id=AO1h97ca7e0A&format=png&color=FFFFFF" alt="back button" width={30} height={30} style={{ cursor: "pointer" }} />

                    </div>
                    {section_details?.isSuccess && <div className="">
                        {isOpenDeleteModal && <DeleteModal isModalOpen={isOpenDeleteModal} setIsModalOpen={setIsOpenDeleteModal} handleDelete={deletePages} loading={is_page_deleted?.isLoading}/>}
                        <div className="mb-6 flex justify-between">
                            <label htmlFor="section-name" className="block mb-2 text-2xl font-medium text-white dark:text-white">{sectionName}</label>
                            <button onClick={() => setEditModalOpen(true)} className='text-black bg-gradient-to-r from-[#fbb90d] to-[#22ebff]  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Add New Page</button>
                   
                        </div>
                        {Array.isArray(textList) && textList?.length > 0 && textList.map((list, index) => (
                            <div key={index} className='mb-4 mt-3 bg-cardBg p-4 rounded'>
                                <div className='flex justify-end gap-3' title='View Page'>
                                    <a onClick={() => router.push(`/view-page/${sectionId}/${list?._id}`)} target="_blank" rel="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </a>

                                    <div onClick={() => router.push(`/view-page/${sectionId}/${list?._id}/edit`)} title="Edit page" className='cursor-pointer gap-8'>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.06 6L12 6.94L2.92 16H2V15.08L11.06 6ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z" fill="#666C78" />
                                        </svg>
                                    </div>
                                    <div onClick={() => handleDeletePage(list?._id)} title="Delete page" className='cursor-pointer gap-8'>
                                        <svg  style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" fill="transparent" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </div>
                                </div>



                                <div className="mb-6">
                                    <label htmlFor={`page-name-${index}`} className="block mb-2 text-sm font-medium text-white dark:text-white">Page name</label>
                                    <input
                                        type="text"
                                        id={`page-name-${index}`}
                                        value={list.title}
                                        disabled
                                        onChange={(e) => handleSetValues(e, index, "title")}
                                        className="bg-black text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className='flex gap-3'>
                        </div>

                    </div>}
                </div>
            )}
            {editModalOpen && <EditPagesModal isOpen={editModalOpen} setIsOpen={setEditModalOpen} sectionId={sectionId} />}
        </>
    );
};

export default ViewPages;
