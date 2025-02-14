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
        <div className="fixed inset-0 z-10 flex items-center justify-center shadow-lg" style={{ backgroundColor: 'rgba(152, 152, 152, 0.6)' }}
        >
            <div className="bg-black p-6 rounded-lg shadow-xl w-full max-w-3xl dark:bg-gray-dark">
                <div className="">
                    <div className='justify-between flex'>
                        <h1 className='font-medium text-2xl text-white mb-3'>Event Details</h1>
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
                    <div className="w-full flex text-center w-[80%] m-auto">
                        <img src={value?.image} alt="event" width={600} height={400} />
                    </div>
                    <div className="flex flex-row w-[80%] m-auto justify-between items-center">
                        <div>
                            <div className="flex items-center">
                                <svg
                                    className="fill-current"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18.2892 4.88976C17.2615 4.75159 15.9068 4.75 14 4.75L10 4.75C8.09318 4.75 6.73851 4.75159 5.71085 4.88976C4.70476 5.02503 4.12511 5.27869 3.7019 5.7019C3.27869 6.12511 3.02502 6.70476 2.88976 7.71085C2.75159 8.73851 2.75 10.0932 2.75 12C2.75 13.9068 2.75159 15.2615 2.88976 16.2892C3.02502 17.2952 3.27869 17.8749 3.7019 18.2981C4.12511 18.7213 4.70476 18.975 5.71085 19.1102C6.73851 19.2484 8.09318 19.25 10 19.25H14C15.9068 19.25 17.2615 19.2484 18.2892 19.1102C19.2952 18.975 19.8749 18.7213 20.2981 18.2981C20.7213 17.8749 20.975 17.2952 21.1102 16.2892C21.2484 15.2615 21.25 13.9068 21.25 12C21.25 10.0932 21.2484 8.73851 21.1102 7.71085C20.975 6.70476 20.7213 6.12511 20.2981 5.7019C19.8749 5.27869 19.2952 5.02502 18.2892 4.88976ZM18.489 3.40314C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33856 22.5969 7.51098C22.75 8.65019 22.75 10.1058 22.75 11.9436V12.0564C22.75 13.8942 22.75 15.3498 22.5969 16.489C22.4392 17.6614 22.1071 18.6104 21.3588 19.3588C20.6104 20.1071 19.6614 20.4392 18.489 20.5969C17.3498 20.75 15.8942 20.75 14.0564 20.75H9.94359C8.10583 20.75 6.65019 20.75 5.51098 20.5969C4.33856 20.4392 3.38961 20.1071 2.64124 19.3588C1.89288 18.6104 1.56076 17.6614 1.40314 16.489C1.24997 15.3498 1.24998 13.8942 1.25 12.0564V11.9436C1.24998 10.1058 1.24997 8.65019 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40314C6.65019 3.24997 8.10583 3.24998 9.94359 3.25L14.0564 3.25C15.8942 3.24998 17.3498 3.24997 18.489 3.40314ZM8.25 17C8.25 16.5858 8.58579 16.25 9 16.25H15C15.4142 16.25 15.75 16.5858 15.75 17C15.75 17.4142 15.4142 17.75 15 17.75H9C8.58579 17.75 8.25 17.4142 8.25 17Z"
                                        fill="white"
                                    />
                                </svg>
                                <h5 className="p-2 text-white text-xs">{value?.establishmentName}</h5>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    className="fill-current"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 16.75C11.6 16.75 11.2 16.72 10.82 16.65C8.7 16.34 6.77 15.12 5.55 13.31C4.7 12.03 4.25 10.54 4.25 9C4.25 4.73 7.73 1.25 12 1.25C16.27 1.25 19.75 4.73 19.75 9C19.75 10.54 19.3 12.03 18.45 13.31C17.22 15.13 15.29 16.34 13.15 16.66C12.8 16.72 12.4 16.75 12 16.75ZM12 2.75C8.55 2.75 5.75 5.55 5.75 9C5.75 10.25 6.11 11.45 6.79 12.47C7.78 13.93 9.33 14.91 11.05 15.16C11.69 15.27 12.32 15.27 12.91 15.16C14.66 14.91 16.21 13.92 17.2 12.46C17.88 11.44 18.24 10.24 18.24 8.98999C18.25 5.54999 15.45 2.75 12 2.75Z" fill="" />
                                    <path fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.46933 22.59C6.32933 22.59 6.19933 22.57 6.05933 22.54C5.40933 22.39 4.90933 21.89 4.75933 21.24L4.40933 19.77C4.38933 19.68 4.31933 19.61 4.21933 19.58L2.56933 19.19C1.94933 19.04 1.45933 18.58 1.28933 17.97C1.11933 17.36 1.28933 16.7 1.73933 16.25L5.63933 12.35C5.79933 12.19 6.01933 12.11 6.23933 12.13C6.45933 12.15 6.65933 12.27 6.78933 12.46C7.77933 13.92 9.32933 14.91 11.0593 15.16C11.6993 15.27 12.3293 15.27 12.9193 15.16C14.6693 14.91 16.2193 13.92 17.2093 12.46C17.3293 12.27 17.5393 12.15 17.7593 12.13C17.9793 12.11 18.1993 12.19 18.3593 12.35L22.2593 16.25C22.7093 16.7 22.8793 17.36 22.7093 17.97C22.5393 18.58 22.0393 19.05 21.4293 19.19L19.7793 19.58C19.6893 19.6 19.6193 19.67 19.5893 19.77L19.2393 21.24C19.0893 21.89 18.5893 22.39 17.9393 22.54C17.2893 22.7 16.6193 22.47 16.1993 21.96L11.9993 17.13L7.79933 21.97C7.45933 22.37 6.97933 22.59 6.46933 22.59ZM6.08933 14.03L2.79933 17.32C2.70933 17.41 2.71933 17.51 2.73933 17.57C2.74933 17.62 2.79933 17.72 2.91933 17.74L4.56933 18.13C5.21933 18.28 5.71933 18.78 5.86933 19.43L6.21933 20.9C6.24933 21.03 6.34933 21.07 6.40933 21.09C6.46933 21.1 6.56933 21.11 6.65933 21.01L10.4893 16.6C8.78933 16.27 7.22933 15.36 6.08933 14.03ZM13.5093 16.59L17.3393 20.99C17.4293 21.1 17.5393 21.1 17.5993 21.08C17.6593 21.07 17.7493 21.02 17.7893 20.89L18.1393 19.42C18.2893 18.77 18.7893 18.27 19.4393 18.12L21.0893 17.73C21.2093 17.7 21.2593 17.61 21.2693 17.56C21.2893 17.51 21.2993 17.4 21.2093 17.31L17.9193 14.02C16.7693 15.35 15.2193 16.26 13.5093 16.59Z"
                                        fill="" />
                                    <path
                                        d="M13.8901 12.89C13.6301 12.89 13.3201 12.82 12.9501 12.6L12.0001 12.03L11.0501 12.59C10.1801 13.11 9.61014 12.81 9.40014 12.66C9.19014 12.51 8.74014 12.06 8.97014 11.07L9.21014 10.04L8.41014 9.29999C7.97014 8.85999 7.81014 8.33001 7.96014 7.85001C8.11014 7.37001 8.55014 7.02999 9.17014 6.92999L10.2401 6.75L10.7501 5.63C11.0401 5.06 11.4901 4.73999 12.0001 4.73999C12.5101 4.73999 12.9701 5.07001 13.2501 5.64001L13.8401 6.82001L14.8301 6.94C15.4401 7.04 15.8801 7.37999 16.0401 7.85999C16.1901 8.33999 16.0301 8.87 15.5901 9.31L14.7601 10.14L15.0201 11.07C15.2501 12.06 14.8001 12.51 14.5901 12.66C14.4801 12.75 14.2401 12.89 13.8901 12.89ZM9.61014 8.39001L10.3001 9.07999C10.6201 9.39999 10.7801 9.94 10.6801 10.38L10.4901 11.18L11.2901 10.71C11.7201 10.46 12.3001 10.46 12.7201 10.71L13.5201 11.18L13.3401 10.38C13.2401 9.93 13.3901 9.39999 13.7101 9.07999L14.4001 8.39001L13.5301 8.23999C13.1101 8.16999 12.6901 7.86001 12.5001 7.48001L12.0001 6.5L11.5001 7.5C11.3201 7.87 10.9001 8.19001 10.4801 8.26001L9.61014 8.39001Z"
                                        fill="white" />
                                </svg>
                                <h5 className="p-2 text-white text-xs">{value?.eventTitle}</h5>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M21,2H3A1,1,0,0,0,2,3V21a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM4,4H20V6H4ZM20,20H4V8H20ZM6,12a1,1,0,0,1,1-1H17a1,1,0,0,1,0,2H7A1,1,0,0,1,6,12Zm0,4a1,1,0,0,1,1-1h5a1,1,0,0,1,0,2H7A1,1,0,0,1,6,16Z" /></svg>
                                <h5 className="p-2 text-white text-xs">{value?.eventDescription}</h5>
                            </div>

                        </div>
                        <div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5.4 0 98.4 98.4">
                                    <g id="Group_4" data-name="Group 4" transform="translate(-822.7 -241.5)">
                                        <path id="Path_52" data-name="Path 52" d="M899.4,254.3H833.6a8.92,8.92,0,0,0-8.9,8.9V329a8.92,8.92,0,0,0,8.9,8.9h65.8a8.92,8.92,0,0,0,8.9-8.9V263.2A8.92,8.92,0,0,0,899.4,254.3Z" fill="white" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" />
                                        <line id="Line_25" data-name="Line 25" x2="21.2" transform="translate(842.6 283.7)" fill="white" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" />
                                        <line id="Line_26" data-name="Line 26" x2="45.9" transform="translate(842.6 302)" fill="white" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" />
                                        <line id="Line_27" data-name="Line 27" y2="19.6" transform="translate(853.6 243.5)" fill="white" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" />
                                        <line id="Line_28" data-name="Line 28" y2="19.6" transform="translate(879.4 243.5)" fill="white" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" />
                                    </g>
                                </svg>
                                <h5 className="p-2 text-white text-xs">{formatDate(value?.eventStart?.date)} at {convertTo12HourFormat(value?.eventStart?.time)}</h5>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-5.4 0 98.4 98.4">
                                    <g id="Group_4" data-name="Group 4" transform="translate(-822.7 -241.5)">
                                        <path id="Path_52" data-name="Path 52" d="M899.4,254.3H833.6a8.92,8.92,0,0,0-8.9,8.9V329a8.92,8.92,0,0,0,8.9,8.9h65.8a8.92,8.92,0,0,0,8.9-8.9V263.2A8.92,8.92,0,0,0,899.4,254.3Z" fill="white" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" />
                                        <line id="Line_25" data-name="Line 25" x2="21.2" transform="translate(842.6 283.7)" fill="white" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" />
                                        <line id="Line_26" data-name="Line 26" x2="45.9" transform="translate(842.6 302)" fill="white" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" />
                                        <line id="Line_27" data-name="Line 27" y2="19.6" transform="translate(853.6 243.5)" fill="white" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" />
                                        <line id="Line_28" data-name="Line 28" y2="19.6" transform="translate(879.4 243.5)" fill="white" stroke="#2b4ea2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="4" />
                                    </g>
                                </svg>
                                <h5 className="p-2 text-white text-xs">{formatDate(value?.eventEnd?.date)} at {convertTo12HourFormat(value?.eventEnd?.time)}</h5>
                            </div>
                        </div>
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
