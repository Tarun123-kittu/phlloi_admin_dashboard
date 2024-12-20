'use client'

import React from 'react'
import { useRouter } from "next/navigation";
import ResetPassword from "../../../components/Auth/reset-password/resetPassword"

const Reset_password = ({ params }: { params: { email: string } }) => {
    const router = useRouter();
    if (localStorage.getItem('phloii_token')) {
        router.push("/")
    }
    return (
        <div>
            <ResetPassword email={params.email} />
        </div>
    )
}

export default Reset_password