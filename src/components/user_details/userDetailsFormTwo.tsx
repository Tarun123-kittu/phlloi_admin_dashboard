import React from 'react'
import { UserProfile } from "../../types/UserProfile"

const UserDetailsFormTwo = ({ userData }: { userData: UserProfile }) => {
    return (
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white">
            <form className="font-[sans-serif] mx-auto w-full p-4">
                <div className="grid sm:grid-cols-2 gap-8">
                    {/* First Column */}
                    <div className="relative">
                        <label htmlFor="lastName" className="text-sm text-gray-700 dark:text-gray-300">Relationship Type</label>
                        <div className="relative flex items-center">
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={userData?.relationship_type_preference_id?.value}
                                className="px-2 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#bbb"
                                stroke="#bbb"
                                className="w-[18px] h-[18px] absolute right-2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                <path
                                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                    data-original="#000000"
                                ></path>
                            </svg>
                        </div>
                    </div>

                    {/* Second Column */}
                    <div className="relative">
                        <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">Profile Verified</label>
                        <div className="relative flex items-center">
                            <input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={userData?.verified_profile ? "True" : "False"}
                                className="px-2 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#bbb"
                                stroke="#bbb"
                                className="w-[18px] h-[18px] absolute right-2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                <path
                                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                    data-original="#000000"
                                ></path>
                            </svg>
                        </div>
                    </div>

                    {/* Repeat for other fields */}
                    <h1>Sexual Orientation</h1> <h1></h1>
                    {userData?.sexual_orientation_preference_id?.map((data, index) => {
                        return (
                            <div className="">
                                <label htmlFor="phoneNumber" className="text-sm text-gray-700 dark:text-gray-300"></label>
                                <div className="relative flex items-center">
                                    <input
                                        id="phoneNumber"
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={data?.value}
                                        className="px-2 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        )
                    })}

                    <h1>User Chracterstics</h1> <h1></h1>
                    {userData?.user_characterstics?.step_11?.map((data, index) => {
                        return (
                            <div className="">
                                <label htmlFor="phoneNumber" className="text-sm text-gray-700 dark:text-gray-300">{data?.questionText}</label>
                                <div className="relative flex items-center">
                                    <input
                                        id="phoneNumber"
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={data?.answerText ? data?.answerText : data?.answerTexts?.map((val) => val)}
                                        className="px-2 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        )
                    })}
                    {userData?.user_characterstics?.step_12?.map((data, index) => {
                        return (
                            <div className="">
                                <label htmlFor="phoneNumber" className="text-sm text-gray-700 dark:text-gray-300">{data?.questionText}</label>
                                <div className="relative flex items-center">
                                    <input
                                        id="phoneNumber"
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={data?.answerText ? data?.answerText : data?.answerTexts?.map((val) => val)}
                                        className="px-2 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        )
                    })}
                    {userData?.user_characterstics?.step_13?.map((data, index) => {
                        return (
                            <div className="">
                                <label htmlFor="phoneNumber" className="text-sm text-gray-700 dark:text-gray-300">{data?.questionText}</label>
                                <div className="relative flex items-center">
                                    <input
                                        id="phoneNumber"
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={data?.answerText ? data?.answerText : data?.answerTexts?.map((val) => val)}
                                        className="px-2 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#bbb"
                                        stroke="#bbb"
                                        className="w-[18px] h-[18px] absolute right-2"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        )
                    })}


                    <div className="relative">
                        <label htmlFor="address" className="text-sm text-gray-700 dark:text-gray-300">Show Gender</label>
                        <div className="relative flex items-center">
                            <input
                                id="address"
                                type="text"
                                placeholder="Address"
                                value={userData?.show_gender}
                                className="px-2 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#bbb"
                                stroke="#bbb"
                                className="w-[18px] h-[18px] absolute right-2"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                <path
                                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                    data-original="#000000"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
              
            </form>
        </div>
    )
}

export default UserDetailsFormTwo
