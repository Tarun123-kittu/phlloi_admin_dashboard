'use client'

import React from 'react'
import { useRouter } from "next/navigation";
import ForgotPassword from "../../components/Auth/forgot-password/forgotPassword"

const Forgot_password = () => {
    const router = useRouter();
    if (localStorage.getItem('phloii_token')) {
        router.push("/")
    }
    return (
        <div>
            <ForgotPassword />
        </div>
    )
}

export default Forgot_password