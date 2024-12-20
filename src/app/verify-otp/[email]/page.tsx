'use client'

import React from 'react'
import VerifyOtp from "../../../components/Auth/verify-otp/verifyOtp"
import { useRouter } from "next/navigation";

const Verify_otp = ({ params }: { params: { email: string } }) => {
    const router = useRouter();
    if (localStorage.getItem('phloii_token')) {
        router.push("/")
    }
    return (
        <div>
            <VerifyOtp email={params.email}/>
        </div>
    )
}

export default Verify_otp