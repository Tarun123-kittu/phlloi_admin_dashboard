'use client'

import React, { useState } from 'react';
import dynamic from "next/dynamic";
import TextEditor from "../../components/safety-and-privacy/TextEditor"

interface ChangePasswordModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}

const CreatePagesModal: React.FC<ChangePasswordModalProps> = ({ setIsOpen, isOpen }) => {

    const closeModal = () => setIsOpen(false);
    const [textList, setTextList] = useState([
        {
            "title": "",
            "content": "",
            "slug": "",
        }
    ]);

    return (
        <>
            {/* Modal */}
            {isOpen && (
                <div
                    id="default-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50"
                >
                    <div className="relative w-1/2 max-h-full p-4">
                        {/* Modal content */}

                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-8">
                            <h1 className='font-bold text-2xl'>Add New Page</h1>
                            <div className="mb-6">
                                <label htmlFor="section-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section name</label>
                                <input 
                                    type="text" 
                                    id="section-name" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                />
                            </div>
                            {textList.map((list, index) => (
                                <div key={index}>
                                    <div className="mb-6">
                                        <label htmlFor={`page-name-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Page name</label>
                                        <input 
                                            type="text" 
                                            id={`page-name-${index}`} 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor={`slug-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
                                        <input 
                                            type="text" 
                                            id={`slug-${index}`} 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        />
                                    </div>
                                    <TextEditor />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreatePagesModal;
