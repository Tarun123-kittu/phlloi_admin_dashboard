'use client'

import React from "react";

interface CreateRoomProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    value: any
}

const ViewEventModal: React.FC<CreateRoomProps> = ({ setIsOpen, isOpen, value }) => {
    function formatDate(isoDate: string) {
        const date = new Date(isoDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    function convertTo12HourFormat(time: string) {
        let [hours, minutes] = time.split(":").map(Number);
        let period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
    }

    return isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center shadow-lg" style={{ backgroundColor: 'rgba(152, 152, 152, 0.6)' }}>
            <div className="bg-black p-6 rounded-lg shadow-xl w-full max-w-lg dark:bg-gray-dark">
                <div className="">
                    <div className='justify-between flex'>
                        <h1 className='font-medium text-2xl text-white mb-3'>{value?.eventTitle}</h1>
                        <button
                            onClick={() => { setIsOpen(false) }}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="w-full flex text-center min-h-16  m-auto">
                        <img src={value?.image} alt="event" width={"100%"} height={270} className="rounded" />
                    </div>
                    <div className="">
                        <h3 className="pb-3 text-white text-2xl">{value?.establishmentName}</h3>
                        <h5 className="text-white text-md pb-3">{value?.eventDescription}</h5>


                        <h5 className="text-white text-sm">From {formatDate(value?.eventStart?.date)} at {convertTo12HourFormat(value?.eventStart?.time)} to {formatDate(value?.eventEnd?.date)} at {convertTo12HourFormat(value?.eventEnd?.time)}</h5>

                    </div>
                </div>


                {/* Submit and Cancel Buttons */}
                {/* <div className=" sm:flex sm:flex-row-reverse sm:gap-4 ">

                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-3 w-full justify-center rounded-lg border  border-gray-300 shadow-sm px-4 py-2 bg-cardBg text-base font-normal text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 "
                    >
                        Cancel
                    </button>

                    :
                    <button disabled type="button" className="text-white bg-hBgColor focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600  dark:focus:ring-blue-800 inline-flex items-center">
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Loading...
                    </button>
                    <button
                        className="py-3  text-center text-sm font-medium text-black rounded  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] w-full"
                    >
                        Submit
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default ViewEventModal;
