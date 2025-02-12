"use client";
import React, { useState, useRef, useEffect } from "react";

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

const UserFilter: React.FC<Props> = ({
  setVerified,
  setUsername,
  setGender,
  verified,
  username,
  gender,
  handleSearch,
  clearResult,
  isSearched,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenGender, setIsOpenGender] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const genderDropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDropdownGender = () => {
    setIsOpenGender((prev) => !prev);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
    if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target as Node)) {
      setIsOpenGender(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleVerifiedChange = (e: React.FormEvent, value: boolean) => {
    setVerified(value);
    setIsOpen((prev) => !prev);
    if (verified !== null) {
      handleSearch(e)
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    handleSearch(e)
  };

  const handleGenderChange = (e: React.FormEvent, value: string) => {
    setGender(value);
    setIsOpenGender((prev) => !prev);
    handleSearch(e)
  };

  return (
    <div>
      <div className="relative mb-4 flex gap-4">
        <div>
          <label
            htmlFor="first_name"
            className="mb-2 block text-sm font-normal text-white dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="first_name"
            value={username}
            onChange={handleUsernameChange}
            className="block  w-full  rounded-lg bg-cardBg p-2.5 text-sm text-white placeholder-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="eg. john"
          />
        </div>
        <div ref={dropdownRef}>
          <label
            htmlFor="first_name"
            className="mb-2 block text-sm font-normal text-white dark:text-white"
          >
            Verified Profile
          </label>
          <div className="relative">
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="ddark:bg-gray-800 inline-flex w-40 items-center  rounded-lg bg-cardBg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-700 dark:text-white"
              type="button"
            >
              {verified === null
                ? "Select Status"
                : verified
                  ? "Verified"
                  : "Not verified"}

              <svg
                className="ml-auto h-2.5 w-2.5"
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
              className={`z-50 ${isOpen ? "block" : "hidden"} mt-2 absolute w-full divide-y divide-gray-100 rounded-lg border border-[#fdfdfd3d] bg-cardBg shadow dark:bg-gray-700`}
              style={{ top: "100%" }}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li className="border-b border-[#fdfdfd3d]">
                  <a
                    href="#"
                    className="block px-4 py-2 text-white  dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Select Status
                  </a>
                </li>
                <li className="border-b border-[#fdfdfd3d]">
                  <a
                    href="#"
                    onClick={(e) => { handleVerifiedChange(e, true); setVerified(true) }}
                    className="block px-4 py-2 text-white  dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Verified
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => { handleVerifiedChange(e, false); setVerified(false) }}
                    className="block px-4 py-2 text-white  dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Not varified
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div ref={genderDropdownRef}>
          <label
            htmlFor="first_name"
            className="mb-2 block text-sm font-normal text-white dark:text-white"
          >
            Gender
          </label>
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdownGender}
            className="ddark:bg-gray-800 inline-flex w-40 items-center  rounded-lg bg-cardBg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-700 dark:text-white"
            type="button"
          >
            {gender ? gender : "Select Gender"}
            <svg
              className="ml-auto h-2.5 w-2.5"
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
            className={`z-50 ${isOpenGender ? "block" : "hidden"} mt-2 absolute w-44 divide-y divide-gray-100 rounded-lg border border-[#fdfdfd3d] bg-cardBg shadow dark:bg-gray-700`}
            style={{ top: "100%" }}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li className="border-b border-[#fdfdfd3d]">
                <a
                  href="#"
                  onClick={(e) => handleGenderChange(e, "men")}
                  className="block px-4 py-2 text-white  dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Men
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleGenderChange(e, "women")}
                  className="block px-4 py-2 text-white  dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Women
                </a>
              </li>
            </ul>
          </div>
        </div>

        <form className="ml-auto flex max-w-lg items-center justify-end">

          {isSearched && <button
            onClick={(e) => clearResult(e)}
            type="submit"
            className="ms-2 inline-flex items-center rounded-lg border bg-gradient-to-r from-[#fbb90d] to-[#22ebff] px-3 py-2.5 text-sm font-medium text-hColor   focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Clear
          </button>}
        </form>
      </div>
    </div>
  );
};

export default UserFilter;
