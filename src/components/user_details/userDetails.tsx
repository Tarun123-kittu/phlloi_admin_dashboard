'use client'

import React, { useState, useEffect } from 'react'
import UserDetailsFormFirst from "./userDetailsFormFirst"
import UserDetailsFormTwo from "./userDetailsFormTwo"
import { UserDetailsAPI, clear_user_details_state } from "../../redux/slices/userSlice/getUserDetails"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/AppStore";
import { Verify_User_API, clearVerifyUserState } from "../../redux/slices/userVerificationSlice/verifyUser"
import { toast } from "react-hot-toast";
import Loader from "../loader/Loader"
import { VerificationListAPI, clear_varification_list_state } from "../../redux/slices/userVerificationSlice/getAllVerificationRequests"
import { UsersList, clear_all_user_state } from "../../redux/slices/userSlice/userListSlice"
import "./styling.css";


const UserDetails = ({ id }: { id: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [currentStep, setCurrentStep] = useState<number>(1);

    const user_details = useSelector((state: RootState) => state.USER_DATAILS);
    const user_verification_status = useSelector((state: RootState) => state.VERIFY_USER);

    useEffect(() => {
        return () => {
            clear_user_details_state();
        };
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(UserDetailsAPI({ id }))
        }
    }, [id])

    const handleChangeVerifyStatus = (status: boolean, id: string) => {
        dispatch(Verify_User_API({ userId: id, verificationStatus: !status }))
    }

    useEffect(() => {
        if (user_verification_status?.isSuccess) {
            dispatch(UserDetailsAPI({ id }))
            dispatch(VerificationListAPI({ page: 1 }))
            dispatch(clear_varification_list_state())
            dispatch(UsersList({ page: 1 }))
            dispatch(clear_all_user_state())
            toast.success(user_verification_status?.message)
            dispatch(clearVerifyUserState())
        }
        if (user_verification_status?.isError) {
            toast.success(user_verification_status?.error)
            dispatch(clearVerifyUserState())
        }
    }, [user_verification_status])

    return (
        <div>
            <ol className="flex items-center  w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700 sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">

                <li
                    onClick={() => setCurrentStep(1)}
                    className={`flex items-center cursor-pointer ${currentStep === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-300'}`}
                >
                    <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${currentStep === 1 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'}`}>
                        1
                    </span>
                    Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                    <svg
                        className={`w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180 ${currentStep === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-300'}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 10"
                    >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                    </svg>
                </li>

                <li
                    onClick={() => setCurrentStep(2)}
                    className={`flex items-center cursor-pointer ${currentStep === 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-300'}`}
                >
                    <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${currentStep === 2 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'}`}>
                        2
                    </span>
                    Account <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                </li>

                <div className="Verif-text flex items-end">
                    {user_details?.users?.verified_profile ? (
                        <div className="flex items-center text-green-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-check-circle me-2"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.93 3.93a1 1 0 0 1 0 1.41l-6 6a1 1 0 0 1-1.41 0l-3-3a1 1 0 1 1 1.41-1.41L6 8.59l5.59-5.59a1 1 0 0 1 1.41 0z" />
                            </svg>
                            Verified
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <input
                                onClick={() => handleChangeVerifyStatus(user_details?.users?.verified_profile, user_details?.users?._id)}
                                checked={user_details?.users?.verified_profile}
                                id="default-radio-2"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Verify
                            </label>
                        </div>
                    )}
                </div>

            </ol>


            {/* Conditionally Render Content Based on Current Step */}
            {user_details?.isLoading ? <Loader /> : user_details?.users && <div className="mt-4">
                {currentStep === 1 && (
                    <div>
                        <UserDetailsFormFirst userData={user_details.users} />
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <UserDetailsFormTwo userData={user_details.users} />
                    </div>
                )}
            </div>}
        </div>
    )
}

export default UserDetails;
