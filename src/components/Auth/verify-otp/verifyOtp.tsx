'use client'

import React, { useState, useEffect } from 'react'
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { Verify_Otp, clearVerifyOtpState } from "../../../redux/slices/authSlice/verifyOtpSlice"
import { Resend_Otp, clear_resend_otp_state } from "../../../redux/slices/authSlice/resendOtpSlice"
import { useRouter } from "next/navigation";

const VerifyOtp = ({ email }: { email: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [otp, setOtp] = useState<string>()
    const decodedEmail = decodeURIComponent(email);

    const verify_otp_state = useSelector((state: RootState) => state.VERIFY_OTP);
    const resend_otp_state = useSelector((state: RootState) => state.RESEND_OTP);

    useEffect(() => {
        if (verify_otp_state?.isSuccess) {
            setOtp("")
            toast.success(verify_otp_state?.message)
            router.push(`/reset-password/${decodedEmail}`)
            dispatch(clearVerifyOtpState())
        }
        if (verify_otp_state?.isError) {
            toast.error(verify_otp_state?.error)
            dispatch(clearVerifyOtpState())
        }
    }, [verify_otp_state])

    useEffect(() => {
        if (resend_otp_state?.isSuccess) {
            toast.success("OTP has been resent to your registered email !!")
            dispatch(clear_resend_otp_state())
        }
        if (resend_otp_state?.isError) {
            toast.error(resend_otp_state?.error)
            dispatch(clear_resend_otp_state())
        }
    }, [resend_otp_state])



    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault()
        if (!otp) {
            toast.error("Please enter the OTP")
            return;
        }

        dispatch(Verify_Otp({ otp, email: decodedEmail }))
    }

    const handleResendOtp = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(Resend_Otp({ email: decodedEmail }))
    }
    return (
        <div>
            <div className="min-h-screen flex flex-1 flex-col justify-center space-y-5 max-w-md mx-auto">
                <div className="flex flex-col space-y-2 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Confirm OTP</h2>
                    <p className="text-md md:text-xl">
                        Enter the OTP we just sent you on your email.
                    </p>
                </div>
                <div className="flex flex-col max-w-md space-y-5">
                    <input
                        type="text"
                        placeholder="otp"
                        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal text-center"
                        value={otp}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (/^\d{0,4}$/.test(input)) {
                                setOtp(input);
                            }
                        }}
                    />
                    {!resend_otp_state?.isLoading ? (
                        <p
                            className="text-center text-blue-700 cursor-pointer"
                            onClick={(e) => handleResendOtp(e)}
                        >
                            Resend OTP
                        </p>
                    ) : (
                        <div
                            role="status"
                            className="flex justify-center items-center w-full h-full"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}


                    {!verify_otp_state?.isLoading ? <button
                        onClick={(e) => handleVerifyOtp(e)}
                        className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-blue-500 hover:bg-blue-700 text-white"
                    >
                        Confirm
                    </button>
                        :
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

    )
}

export default VerifyOtp