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
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            {!isInputShow && <h2 className="text-white text-center" id="modal-title">{pathname === "/users" ? "Delete User" : pathname === "/establishment-verification" ? "Delete Establishment" : pathname === "/pages" ? "Delete section" : "Delete Page"}</h2>}
                                            {isInputShow && <h2 className="text-white text-center" id="modal-title">Reject Establishment</h2>}
                                            <div className="mt-2">
                                                {!isInputShow ? <p className="text-sm text-white">Are you sure you want to Delete</p> : <p className="text-sm text-white">Are you sure you want to Reject this establishment</p>}
                                            </div>
                                        </div>
                                    </div>
                                    {isInputShow && <div className='mt-4'>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-white dark:text-white"
                                        >
                                            Reason (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            className="bg-cardBg mb-3 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Pleas provide the rejecton reason"
                                            value={reason}
                                            onChange={(e) => setReason?.(e.target.value)}


                                        />
                                    </div>}
                                </div>
                                <div className="px-4 py-3 flex gap-4 sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-3 w-full justify-center rounded-lg border  border-gray-300 shadow-sm px-4 py-2 bg-cardBg text-sm font-normal text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 "
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
                                            className="py-3  text-center text-sm font-medium text-black rounded  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] w-full"
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
