import React from 'react';
import { UserProfile } from "../../types/UserProfile"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';



const UserDetailsFormFirst = ({ userData }: { userData: UserProfile }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
            <form className="font-[sans-serif] mx-auto w-full p-4">
                <div className="grid sm:grid-cols-2 gap-8 ">
                    {userData?.profile_verification_image && <div className="relative bg-white dark:bg-gray-700 p-4 flex justify-center items-center ">
                        <div className="p-4">
                            {userData?.images?.length > 0 && <img
                                width={70}
                                height={70}
                                src={userData?.profile_verification_image}
                                alt="Uploaded Preview"
                                className="w-[400px] h-[400px] object-cover"
                            />}
                        </div>
                    </div>}
                    <div className="relative bg-white dark:bg-gray-700 p-4 flex justify-center items-center ">
                        <div className="p-4">
                            <Carousel showThumbs={false} infiniteLoop autoPlay>
                                {userData?.images?.map((image, i) => (
                                    <div key={i}>
                                        <img className='w-100 h-150'  src={image?.url} alt={`Slide ${i + 1}`} />
                                    </div>
                                ))}
                            </Carousel>
                        </div>

                    </div>

                    <div className="relative">
                        <label htmlFor="lastName" className="text-sm text-gray-700 dark:text-gray-300">Username</label>
                        <div className="relative flex items-center">
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={userData?.username}
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

                        <div className="mt-4">
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">Mobile Number</label>
                            <div className="relative flex items-center">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={userData?.mobile_number}
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

                        {/* Repeat Email section for other fields */}
                        <div className="mt-4">
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">Email</label>
                            <div className="relative flex items-center">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={userData?.email}
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
                        <div className="mt-4">
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">Date of Birth</label>
                            <div className="relative flex items-center">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={userData?.dob}
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
                        <div className="mt-4">
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">Intrested To See</label>
                            <div className="relative flex items-center">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={userData?.intrested_to_see}
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
                        <div className="mt-4">
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">Online Status</label>
                            <div className="relative flex items-center">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={userData?.online_status ? "True" : "False"}
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
                        <div className='mt-4'>
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">Distance Prefrence</label>
                            <div className="relative flex items-center">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={userData?.distance_preference}
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
                        <div className='mt-4'>
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">Subscription Type</label>
                            <div className="relative flex items-center">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={userData?.subscription_type}
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
                        <div className='mt-4'>
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">Gender</label>
                            <div className="relative flex items-center">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={userData?.gender}
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
                </div>
            </form>
        </div>
    );
};

export default UserDetailsFormFirst;
