"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import validator from "validator";
import {toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API_CONFIG } from "@/config/app_config";
export default function SigninWithPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState<Boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        localStorage.getItem("phloii_token") &&
        localStorage.getItem("phloii_admin_remember_me")
      ) {
        router.push("/dashboard");
      } else {
        localStorage.clear();
      }
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Email is required");
      return;
    }

    if (!validator.isEmail(trimmedEmail)) {
      toast.error("Email is not valid");
      return;
    }

    if (!validator.isLength(password, { min: 8 })) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: trimmedEmail,
      password: password,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      setLoader(true);
      const response = await fetch(
        `${API_CONFIG.BASE_URL}admin_login`,
        requestOptions,
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse?.message === "Admin not exist") {
          setLoader(false);
          toast.error("Email not found");
        } else if (
          errorResponse?.loggedError === "Entered password is incorrect"
        ) {
          setLoader(false);
          toast.error("Password is incorrect");
        } else {
          setLoader(false);
          toast.error(`Something went wrong !!`);
        }
        setLoader(false);
        return;
      }

      const result = await response.json();
      setLoader(false);
      if (result?.type === "success") {
        localStorage.setItem("phloii_token", result?.data?.token);
        localStorage.setItem("email", result?.data?.email);
        localStorage.setItem("username", result?.data?.username);
        toast.success("Login Successful");
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };


  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("phloii_admin_remember_me", email);
    }
  }, [rememberMe]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className=" w-full max-w-[466px]">
        <div className="text-center">
          <Image
            width={139}
            height={3}
            src={"/images/logo.svg"}
            alt="Logo"
            priority
            className="m-auto mb-3 dark:hidden"
          />
        </div>
        <h1 className="mb-6 text-center text-2xl font-medium text-hBgColor">
          Login Account
        </h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2.5 block font-medium text-white dark:text-white"
          >
            Email
          </label>
          <div className="relative">
            <input
              placeholder="Enter your email"
              name="email"
              value={email}
              className="h-[38px] w-full rounded-lg bg-cardBg pl-4 pr-4 text-sm font-normal text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.11756 2.979H12.8877C14.5723 2.97899 15.9066 2.97898 16.9509 3.11938C18.0256 3.26387 18.8955 3.56831 19.5815 4.25431C20.2675 4.94031 20.5719 5.81018 20.7164 6.8849C20.8568 7.92918 20.8568 9.26351 20.8568 10.9481V11.0515C20.8568 12.7362 20.8568 14.0705 20.7164 15.1148C20.5719 16.1895 20.2675 17.0594 19.5815 17.7454C18.8955 18.4314 18.0256 18.7358 16.9509 18.8803C15.9066 19.0207 14.5723 19.0207 12.8876 19.0207H9.11756C7.43295 19.0207 6.09861 19.0207 5.05433 18.8803C3.97961 18.7358 3.10974 18.4314 2.42374 17.7454C1.73774 17.0594 1.4333 16.1895 1.28881 15.1148C1.14841 14.0705 1.14842 12.7362 1.14844 11.0516V10.9481C1.14842 9.26351 1.14841 7.92918 1.28881 6.8849C1.4333 5.81018 1.73774 4.94031 2.42374 4.25431C3.10974 3.56831 3.97961 3.26387 5.05433 3.11938C6.09861 2.97898 7.43294 2.97899 9.11756 2.979ZM5.23755 4.48212C4.3153 4.60611 3.78396 4.83864 3.39602 5.22658C3.00807 5.61452 2.77554 6.14587 2.65155 7.06812C2.5249 8.01014 2.52344 9.25192 2.52344 10.9998C2.52344 12.7478 2.5249 13.9895 2.65155 14.9316C2.77554 15.8538 3.00807 16.3852 3.39602 16.7731C3.78396 17.161 4.3153 17.3936 5.23755 17.5176C6.17957 17.6442 7.42135 17.6457 9.16927 17.6457H12.8359C14.5839 17.6457 15.8256 17.6442 16.7677 17.5176C17.6899 17.3936 18.2213 17.161 18.6092 16.7731C18.9971 16.3852 19.2297 15.8538 19.3537 14.9316C19.4803 13.9895 19.4818 12.7478 19.4818 10.9998C19.4818 9.25192 19.4803 8.01014 19.3537 7.06812C19.2297 6.14587 18.9971 5.61452 18.6092 5.22658C18.2213 4.83864 17.6899 4.60611 16.7677 4.48212C15.8256 4.35546 14.5839 4.354 12.8359 4.354H9.16927C7.42135 4.354 6.17958 4.35546 5.23755 4.48212ZM4.97445 6.89304C5.21753 6.60135 5.65104 6.56194 5.94273 6.80502L7.92172 8.45418C8.77693 9.16685 9.37069 9.66005 9.87197 9.98246C10.3572 10.2945 10.6863 10.3993 11.0026 10.3993C11.3189 10.3993 11.648 10.2945 12.1332 9.98246C12.6345 9.66005 13.2283 9.16685 14.0835 8.45417L16.0625 6.80502C16.3542 6.56194 16.7877 6.60135 17.0308 6.89304C17.2738 7.18473 17.2344 7.61825 16.9427 7.86132L14.9293 9.5392C14.1168 10.2163 13.4582 10.7651 12.877 11.1389C12.2716 11.5283 11.6819 11.7743 11.0026 11.7743C10.3233 11.7743 9.73364 11.5283 9.12818 11.1389C8.54696 10.7651 7.88843 10.2163 7.07594 9.5392L5.06248 7.86132C4.77079 7.61825 4.73138 7.18473 4.97445 6.89304Z"
                  fill=""
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-2.5 block font-medium text-white dark:text-white"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[38px] w-full rounded-lg bg-cardBg pl-4 pr-4 text-sm font-normal text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            <span
              className="absolute right-4.5 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <img src="/hide.svg" alt="hide" />
              ) : (
                <img src="/view.svg" alt="hide" />
              )}{" "}
              {/* Toggle text */}
            </span>
          </div>
        </div>
        <div className="mb-5 flex items-center gap-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label
            className="form-check-label sub-text fadeColor  grow-1 ml-1"
            htmlFor="flexCheckDefault"
          >
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="hover:text-primary-dark ml-auto text-sm font-medium text-hBgColor"
          >
            Forgot password?
          </Link>
        </div>

        {!loader ? (
          <button
            onClick={(e) => handleAuth(e)}
            className=" mb-4 w-full rounded bg-gradient-to-r from-[#fbb90d] to-[#22ebff] py-3  text-center text-sm font-medium text-black"
          >
            Sign In
          </button>
        ) : (
          <button
            disabled
            type="button"
            className=" mb-4 w-full rounded bg-gradient-to-r from-[#fbb90d] to-[#22ebff] py-3  text-center text-sm font-medium text-black"
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
  );
}
