"use client";

import React, { useState, useEffect } from "react";
import validator from "validator";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import {
  Forgot_Password,
  clear_forgot_password_state,
} from "../../../redux/slices/authSlice/forgotPasswordSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const email_state = useSelector((state: RootState) => state.FORGOT_PASSWORD);

  useEffect(() => {
    if (email_state?.isSuccess) {
      toast.success(email_state?.message);
      router.push(`/verify-otp/${email}`);
      dispatch(clear_forgot_password_state());
    }
    if (email_state?.isError) {
      toast.error(email_state?.error);
      dispatch(clear_forgot_password_state());
    }
  }, [email_state]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    dispatch(Forgot_Password({ email }));
  };
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-full">
          <div className="relative		 h-screen	w-2/4 after:absolute after:inset-0 after:bg-[#0000004d] after:blur-md after:filter after:backdrop-blur-sm after:content-['']">
            <img
              src="/images/login_image.png"
              className="h-full w-full object-cover"
              alt="login"
            />
          </div>
          <div className="h-screen	w-2/4	bg-black">
            <div>
              <div className="flex min-h-screen items-center justify-center bg-black">
                <div className="max-w-[466px] w-full">
                      <div className="text-center">
                              <Image
                                          width={139}
                                          height={3}
                                          src={"/images/phloii_logo.png"}
                                          alt="Logo"
                                          priority
                                          className="dark:hidden m-auto mb-3"
                                        />
                              </div>
                  <h1 className="mb-6 text-center text-2xl font-medium text-hBgColor">
                    Forgot Password
                  </h1>
                  <form>
                    <div className="mb-4">
                      <label
                        className="mb-2 block font-normal text-white"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                       className="w-full rounded-lg bg-cardBg h-[38px] pl-4 text-sm pr-4 font-normal text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {!email_state?.isLoading ? (
                      <button
                      className=" py-3 mb-4 text-center text-sm font-medium text-black rounded  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] w-full"
                        onClick={(e) => handleSendOtp(e)}
                      >
                        Reset Password
                      </button>
                    ) : (
                      <button
                        disabled
                        type="button"
                        className="mt-4 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="me-3 inline h-4 w-4 animate-spin text-white"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Loading...
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
