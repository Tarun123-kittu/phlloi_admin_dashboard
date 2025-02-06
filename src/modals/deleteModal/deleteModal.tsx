'use client'

import React, { useState } from 'react';
import { usePathname } from 'next/navigation'

interface ChangePasswordModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    handleDelete: () => void
}

const DeleteModal: React.FC<ChangePasswordModalProps> = ({ isModalOpen, setIsModalOpen, handleDelete }) => {
    const pathname = usePathname()
    console.log(pathname,"this is the router pathname")
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            {isModalOpen && (
                <div
                    className="relative z-10"
                    tabIndex={-1}
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="fixed inset-0 bg-red-500/74 transition-opacity " aria-hidden="true" ></div>

                    <div className="fixed inset-0 flex items-center justify-center  w-full h-full overflow-y-auto z-99999" style={{ background: "rgba(152, 152, 152, 0.6)" }}>
                        <div className="flex justify-center items-center p-4 text-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-cardBg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                            <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                        </div> */}
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h2 className="text-white text-center" id="modal-title">{pathname === "/users" ? "Delete User" : "Delete Page"}</h2>
                                            <div className="mt-2">
                                                <p className="text-sm text-white">Are you sure you want to Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" px-4 py-3 flex gap-4 sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-3 w-full justify-center rounded-lg border  border-gray-300 shadow-sm px-4 py-2 bg-cardBg text-sm font-normal text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 "
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleDelete()}
                                        type="button"
                                        className="py-3  text-center text-sm font-medium text-black rounded  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] w-full"
                                    >
                                        Delete
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteModal;
