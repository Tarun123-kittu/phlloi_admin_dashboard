'use client'
import React, { useState } from 'react'


const UserFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenGender, setIsOpenGender] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };
    const toggleDropdownGender = () => {
        setIsOpenGender((prev) => !prev);
    };
    return (
        <div>
            <div className="relative mb-4 flex gap-4">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verified Profile</label>
                    <button
                        id="dropdownDefaultButton"
                        onClick={toggleDropdown}
                        className="text-white bg-gray-500 hover:bg-gray-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:text-white dark:bg-gray-700 ddark:bg-gray-800"
                        type="button"
                    >
                        Select verified Profile
                        <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>

                    <div
                        id="dropdown"
                        className={`z-50 ${isOpen ? "block" : "hidden"} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                        style={{ top: '100%' }}  // Position below the button
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    True
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    False
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input
                            type="text"
                            id="first_name"
                            className="bg-gray-500 border text-white border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-white"
                            placeholder="John"
                        />
                    </div>

                </div>
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                    <button
                        id="dropdownDefaultButton"
                        onClick={toggleDropdownGender}
                        className="text-white bg-gray-500 hover:bg-gray-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:text-white dark:bg-gray-700 ddark:bg-gray-800"
                        type="button"
                    >
                        Select Gender
                        <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>

                    <div
                        id="dropdown"
                        className={`z-50 ${isOpenGender ? "block" : "hidden"} absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                        style={{ top: '100%' }}  // Position below the button
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Male
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Female
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <form className="flex items-center justify-end max-w-lg mx-auto">
                    <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>Search
                    </button>
                    <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Clear
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserFilter