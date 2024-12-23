'use client'

import React, { useState, useEffect } from 'react';
import TextEditor from "../../components/safety-and-privacy/TextEditor"
import { add_section, clear_add_section_state } from "../../redux/slices/pagesSlice/addSectionSlice"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { toast } from "react-hot-toast";
import {get_all_sections} from "../../redux/slices/pagesSlice/getAllSectionsSlice"

interface ChangePasswordModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}

interface PagesArray {
    title: string,
    content: string,
    slug: string
}

const CreatePagesModal: React.FC<ChangePasswordModalProps> = ({ setIsOpen, isOpen }) => {
    const dispatch = useDispatch<AppDispatch>();
    const closeModal = () => setIsOpen(false);
    const [sectionName, setSectionName] = useState<string>("")
    const [textList, setTextList] = useState<PagesArray[]>([
        {
            "title": "",
            "content": "",
            "slug": "",
        }
    ]);

    const is_page_saved = useSelector((state: RootState) => state.ADD_SECTION);

    const handleAddOneMorePage = () => {
        const newRow = {
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
        dispatch(add_section({ section: sectionName, pages: textList }))
    }

    useEffect(() => {
        if (is_page_saved?.isSuccess) {
            toast.success(is_page_saved?.message)
            dispatch(clear_add_section_state())
            setIsOpen(false)
            dispatch(get_all_sections())
        }
        if (is_page_saved?.isError) {
            toast.error("Error occured while creating new page")
            dispatch(clear_add_section_state())
        }

    }, [is_page_saved])



    return (
        <>
            {isOpen && (
                <div
                style={{background:"rgba(152, 152, 152, 0.6)"}}
                    id="default-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed inset-0 z-999 flex items-center justify-center  bg-gray-900 bg-opacity-50"
                >
                                         <div className=" bg-black rounded-lg shadow dark:bg-gray-700 p-8 scroll-smooth overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200" style={{maxHeight:"98vh"}}>

                        <div className="relative  rounded-lg shadow dark:bg-gray-700 p-8">
                            <div className='justify-between flex'>
                            <h1 className='font-medium text-2xl text-white mb-3'>Add New Page</h1>
                            <svg onClick={() => setIsOpen(false)} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                            </div>
                            <div className="mb-6 mt-3">
                                <label htmlFor="section-name" className="block mb-2 text-sm font-medium text-white dark:text-white">Section name</label>
                                <input
                                placeholder='Section name'
                                    type="text"
                                    id="section-name"
                                    value={sectionName}
                                    onChange={(e) => setSectionName(e.target.value)}
                                    className="bg-cardBg text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className='text-right mb-3'> 
                            <button onClick={() => handleAddOneMorePage()} type="button" className="text-black bg-hBgColor  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Page</button>
                         
                            </div>
                              {textList.map((list, index) => (
                                <div key={index} className='bg-cardBg rounded p-4 mb-4'>
                                    <div className='text-right'>
                                   {textList?.length > 1 &&  <svg onClick={() => handleRemoveIndex(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" className="size-6 ml-auto cursor-pointer">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>}
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor={`page-name-${index}`} className="block mb-2 text-sm font-medium text-white dark:text-white">Page name</label>
                                        <input
                                        placeholder='Page name'
                                            type="text"
                                            id={`page-name-${index}`}
                                            value={textList[index].title}
                                            onChange={(e) => handleSetValues(e, index, "title")}
                                            className="bg-black text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor={`slug-${index}`} className="block mb-2 text-sm font-medium text-white dark:text-white">Slug</label>
                                        <input
                                        placeholder='https://www.google.com'
                                            type="text"
                                            id={`slug-${index}`}
                                            value={textList[index].slug}
                                            onChange={(e) => handleSetValues(e, index, "slug")}
                                            className="bg-black text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <TextEditor setTextList={setTextList} index={index} />
                                </div>
                            ))}
                           <div className='flex gap-3'> 
                           <button
                                    onClick={() => setIsOpen(false)}
                                    className=" w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-cardBg text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3"
                                    >
                                    Cancel
                                </button>
                            {!is_page_saved?.isLoading ? <button onClick={(e) => handleSave(e)} type="button" className="text-center text-sm font-medium text-black rounded  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] w-full">Submit</button> :
                            <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                Loading...
                            </button>}
                           </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreatePagesModal;
