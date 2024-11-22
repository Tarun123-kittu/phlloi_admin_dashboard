'use client'

import React from 'react'
import VerifyOtp from "../../../components/Auth/verify-otp/verifyOtp"
import { useRouter } from "next/navigation";

const page = ({ params }: { params: { email: string } }) => {
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

export default page