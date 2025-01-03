'use client'

import React, { useState, useEffect } from 'react'
import validator from "validator";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { reset_password, clear_reset_password_state } from "../../../redux/slices/authSlice/resetPasswordSlice"
import { useRouter } from "next/navigation";

const ResetPassword = ({ email }: { email: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const decodedEmail = decodeURIComponent(email);

    const reset_password_state = useSelector((state: RootState) => state.RESET_PASSWORD);

    useEffect(() => {
        if (reset_password_state?.isSuccess) {
            toast.success("Your Password has been reset successfully !!")
            dispatch(clear_reset_password_state())
            router.push("/")
        }
        if (reset_password_state?.isError) {
            toast.error(reset_password_state?.error)
            dispatch(clear_reset_password_state())
        }
    }, [reset_password_state])

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) {
            toast.error("Please enter a password");
            return;
        }
        if (!validator.isStrongPassword(password)) {
            toast.error("Password must have numbers and a special character");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Password and Confirm password do not match");
            return;
        }
        dispatch(reset_password({ email: decodedEmail, password, confirmPassword }));
    };

    return (
        <div className="bg-slate-200 min-h-screen flex items-center justify-center">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
                <h1 className="text-4xl font-medium">Reset Password</h1>

                <form onSubmit={handleResetPassword} className="my-10">
                    <div className="flex flex-col space-y-5">
                        <label htmlFor="password">
                            <p className="font-medium text-slate-700 pb-2">Password</p>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <label htmlFor="confirmPassword">
                            <p className="font-medium text-slate-700 pb-2">Confirm Password</p>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>

                        {!reset_password_state?.isLoading ? <button
                            type="submit"
                            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                />
                            </svg>
                            <span>Reset Password</span>
                        </button>
                            :
                            <button disabled type="button" className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                Loading...
                            </button>}
                    </div>
                  
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
