'use client'

import React, { useState } from 'react';
import { usePathname } from 'next/navigation'

interface ChangePasswordModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setReason?: React.Dispatch<React.SetStateAction<string>> | undefined;
    isModalOpen: boolean;
    handleDelete: () => void;
    loading?: boolean;
    isInputShow?: boolean;
    reason?: string;
}


const DeleteModal: React.FC<ChangePasswordModalProps> = ({ isModalOpen, setIsModalOpen, handleDelete, loading, setReason, isInputShow, reason }) => {
    const pathname = usePathname()
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
                    <div className="fixed inset-0 bg-red-500/74 transition-opacity" aria-hidden="true" ></div>

                    <div className="fixed inset-0 flex items-center justify-center  w-full h-full overflow-y-auto z-99999" style={{ background: "rgba(152, 152, 152, 0.6)" }}>
                        <div className="flex justify-center items-center p-4 text-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-cardBg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3">
                                            <div className='justify-between flex'>
                                                {!isInputShow && <h2 className="text-white text-center" id="modal-title">{pathname === "/users" ? "Delete User" : pathname === "/establishment-verification" ? "Delete Establishment" : pathname === "/pages" ? "Delete section" : "Delete Page"}</h2>}
                                                {isInputShow && <h2 className="text-white text-xl mb-2" id="modal-title">Reject Establishment</h2>}
                                                <button
                                                    onClick={() => setIsModalOpen(false)}
                                                    type="button"
                                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    <svg
                                                        className="w-3 h-3"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 14 14"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">Close modal</span>
                                                </button>
                                            </div>

                                            <div className="mt-2">
                                                {!isInputShow ? <p className="text-sm text-white">Are you sure you want to Delete</p> : <p className="text-sm text-white text-start text-[16px] leading-normal">Rejecting will mark this establishment as rejected and notify the establishment owner about this</p>}
                                            </div>
                                        </div>
                                    </div>
                                    {isInputShow && <div className='mt-4'>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-white dark:text-white"
                                        >
                                            Rejection reason (Optional)
                                        </label>
                                        <textarea
                                            className="bg-cardBg  text-white text-sm rounded-lg bg-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Please provide the rejection reason"
                                            rows={4}
                                            value={reason}
                                            onChange={(e) => setReason?.(e.target.value)}


                                        />
                                    </div>}
                                </div>
                                <div className="px-4 py-4 flex gap-4 sm:px-6 justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-3 justify-center rounded-lg border  border-gray-300 shadow-sm px-4 py-2 bg-cardBg text-sm font-normal text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 "
                                    >
                                        Cancel
                                    </button>
                                    {!isInputShow ? <button
                                        onClick={() => handleDelete()}
                                        type="button"
                                        className="py-3  text-center text-sm font-medium text-black rounded  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] w-full"
                                        disabled={loading}
                                    >
                                        {loading ? "Deleting..." : "Delete"}
                                    </button>
                                        :
                                        <button
                                            onClick={() => handleDelete()}
                                            type="button"
                                            className="py-3  text-center text-sm font-medium text-black rounded  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] px-4"
                                            disabled={loading}
                                        >
                                            {loading ? "Rejecting..." : "Reject"}
                                        </button>}

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
