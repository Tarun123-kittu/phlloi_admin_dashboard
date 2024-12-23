'use client'
import React, { useState } from 'react'

interface Props {
    setVerified: React.Dispatch<React.SetStateAction<boolean | null>>;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setGender: React.Dispatch<React.SetStateAction<string>>;
    verified: boolean | null;
    isSearched: boolean;
    username: string;
    gender: string;
    handleSearch: (e: React.FormEvent) => void;
    clearResult: (e: React.FormEvent) => void;
  }
  

const UserFilter: React.FC<Props> = ({ setVerified, setUsername, setGender, verified, username, gender, handleSearch, clearResult, isSearched }) => {
    console.log(verified,"this is the verified")
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenGender, setIsOpenGender] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const toggleDropdownGender = () => {
        setIsOpenGender((prev) => !prev);
    };

    const handleVerifiedChange = (e: React.FormEvent, value: boolean) => {
        setVerified(value);
        setIsOpen((prev) => !prev);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleGenderChange = (e: React.FormEvent, value: string) => {
        setGender(value);
        setIsOpenGender((prev) => !prev);
    };

    return (
        <div>
            <div className="relative mb-4 flex gap-4">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-white dark:text-white">Username</label>
                    <input
                        type="text"
                        id="first_name"
                        value={username}
                        onChange={handleUsernameChange}
                        className="bg-cardBg  text-white  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-white"
                        placeholder="eg. john"
                    />
                </div>
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-white dark:text-white">Verified Profile</label>
                   <div className='relative'>
                   <button
                        id="dropdownDefaultButton"
                        onClick={toggleDropdown}
                        className="w-40 text-white bg-cardBg hover:bg-gray-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:text-white dark:bg-gray-700 ddark:bg-gray-800"
                        type="button"
                    >
                        {verified === null ? "Select Status" : verified ? "Verified" : "Not verified"}

                        <svg
                            className="w-2.5 h-2.5 ml-auto"
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
                        className={`z-50 ${isOpen ? "block" : "hidden"} absolute w-full bg-cardBg divide-y divide-gray-100 rounded-lg shadow border border-[#fdfdfd3d] dark:bg-gray-700`}
                        style={{ top: '100%' }}
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li className='border-b border-[#fdfdfd3d]'>
                                <a
                                    href="#"
                                    onClick={(e) => handleVerifiedChange(e, true)}
                                    className="block px-4 py-2 text-white  dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Verified
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => handleVerifiedChange(e, false)}
                                    className="block px-4 py-2 text-white  dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Not varified
                                </a>
                            </li>
                        </ul>
                    </div>
                   </div>
                </div>



                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-normal text-white dark:text-white">Gender</label>
                    <button
                        id="dropdownDefaultButton"
                        onClick={toggleDropdownGender}
                        className="text-white w-40 bg-cardBg hover:bg-gray-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:text-white dark:bg-gray-700 ddark:bg-gray-800"
                        type="button"
                    >
                        {gender ? gender : "Select Gender"}
                        <svg
                            className="w-2.5 h-2.5 ml-auto"
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
                        className={`z-50 ${isOpenGender ? "block" : "hidden"} border border-[#fdfdfd3d] absolute bg-cardBg divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                        style={{ top: '100%' }}
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li className='border-b border-[#fdfdfd3d]'>
                                <a
                                    href="#"
                                    onClick={(e) => handleGenderChange(e, 'men')}
                                    className="block px-4 py-2 text-white  dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Men
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => handleGenderChange(e, 'women')}
                                    className="block px-4 py-2 text-white  dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Women
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <form className="flex items-center justify-end max-w-lg ml-auto">
                    {!isSearched ? <button onClick={(e) => handleSearch(e)} type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-hColor bg-gradient-to-r from-[#fbb90d] to-[#22ebff] rounded-lg border   focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>Search
                    </button>
                        :
                        <button onClick={(e) => clearResult(e)} type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-hColor bg-gradient-to-r from-[#fbb90d] to-[#22ebff] rounded-lg border   focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Clear
                        </button>}
                </form>
            </div>
        </div>
    );
}

export default UserFilter;
