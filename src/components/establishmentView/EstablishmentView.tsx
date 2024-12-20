'use client'

import type { AppDispatch, RootState } from "@/redux";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_selected_hotel_details, clear_selected_hotel_details } from "@/redux/slices/hotelSlice/getSelectedHotelDetails";
import ImageGallery from "../../components/imageGallery/ImageGallery"
import { verify_hotel, clearVerifyHotelState } from "@/redux/slices/hotelSlice/verifyHotel";
import toast from "react-hot-toast";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";



const EstablishmentView = ({ hotelId }: { hotelId: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<any>();
    const [images, setImages] = useState()
    const [index, setIndex] = useState(null)
    const [show_image_preview, setShow_image_preview] = useState(false)
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const hotel_details = useSelector(
        (state: RootState) => state.SELECTED_HOTEL_DETAILS
    );

    const is_hotel_verified = useSelector(
        (state: RootState) => state.VERIFY_HOTEl
    );


    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };
    useEffect(() => {
        dispatch(get_selected_hotel_details(hotelId));
    }, [])

    useEffect(() => {
        if (hotel_details?.isSuccess) {
            setData(hotel_details?.selectedHotel)
        }
    }, [hotel_details])

    useEffect(() => {
        if (is_hotel_verified?.isSuccess) {
            toast.success(is_hotel_verified?.message)
            toggleDropdown()
            dispatch(clearVerifyHotelState())
            dispatch(get_selected_hotel_details(hotelId));
        }
        if (is_hotel_verified?.isError) {
            // toast.error(is_hotel_verified?.error?.message)
            toggleDropdown()
            dispatch(clearVerifyHotelState())
        }
    }, [is_hotel_verified])
    return (
        <div className="mx-auto  w-full">

            <div className="flex bg-cardBg">
                <div className="p-6">
                    <div className="flex gap-3">
                        <img
                            src={data?.images[0]}
                            alt="ffdg"
                            className="h-10 w-10 flex-shrink-0 flex-grow-0 rounded-full"
                        />
                        <div className="grow">
                            <h4 className="m-0 text-[20px] text-white">{data?.establishmentName}</h4>
                            <span
                                title="Address"
                                className="flex items-center gap-[3px] text-[14px]"
                            >
                                <svg
                                    width="15"
                                    height="16"
                                    viewBox="0 0 15 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.2545 8.62089C8.29645 8.62089 9.14112 7.77622 9.14112 6.73427C9.14112 5.69232 8.29645 4.84766 7.2545 4.84766C6.21256 4.84766 5.36789 5.69232 5.36789 6.73427C5.36789 7.77622 6.21256 8.62089 7.2545 8.62089Z"
                                        stroke="white"
                                        strokeWidth="0.907026"
                                    ></path>
                                    <path
                                        d="M2.19437 5.63436C3.3856 0.397798 11.1437 0.403845 12.3289 5.64041C13.0243 8.71221 11.1135 11.3123 9.43848 12.9208C8.22307 14.0939 6.30017 14.0939 5.07871 12.9208C3.40978 11.3123 1.49898 8.70616 2.19437 5.63436Z"
                                        stroke="white"
                                        strokeWidth="0.907026"
                                    ></path>
                                </svg>
                                {data?.address?.streetAddress}
                            </span>
                        </div>
                        <div className="relative inline-block">
                            <button
                                id="dropdownDefaultButton"
                                onClick={toggleDropdown}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="button"
                            >
                                {data?.adminVerified ? "Verified" : "Not Verified"} {is_hotel_verified?.isLoading && <LoadingSpinner />}
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

                            {/* Dropdown menu */}
                            {isDropdownVisible && (
                                <div
                                    id="dropdown"
                                    className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                                >
                                    <ul
                                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                        aria-labelledby="dropdownDefaultButton"
                                    >
                                        <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => dispatch(verify_hotel({ hotelId: data?._id, verificationStatus: true }))}>
                                            Verify
                                        </li>
                                        <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => dispatch(verify_hotel({ hotelId: data?._id, verificationStatus: false }))}>
                                            Reject
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <ul className="mb-5 mt-4 flex justify-between text-white">
                        <li>
                            <span className="block text-[13px]">Establishment Type</span>
                            <strong className="text-[14px] font-semibold">
                                {data?.establishmentType}
                            </strong>
                        </li>
                        <li>
                            <span className="block text-[13px]">Country</span>
                            <strong className="text-[14px] font-semibold">
                                {data?.address?.streetAddress}
                            </strong>
                        </li>
                        <li>
                            <span className="block text-[13px]">State</span>
                            <strong className="text-[14px] font-semibold">{data?.address?.country}</strong>
                        </li>
                        <li>
                            <span className="block text-[13px]">Pin/Zip Code</span>
                            <strong className="text-[14px] font-semibold">{data?.address?.state}</strong>
                        </li>
                        <li>
                            <span className="block text-[13px]">Suite/Unit Number</span>
                            <strong className="text-[14px] font-semibold">{data?.address?.pinCode}</strong>
                        </li>
                    </ul>
                    <ul className="mb-5 mt-4 flex justify-between text-white">
                        <li>
                            <span className="block text-[13px]">Food</span>
                            <strong className="text-[14px] font-semibold">
                                {data?.food?.join(", ")}
                            </strong>
                        </li>
                        <li>
                            <span className="block text-[13px]">Atmosphere</span>
                            <strong className="text-[14px] font-semibold">
                                {data?.atmosphere?.join(", ")}
                            </strong>
                        </li>
                        <li>
                            <span className="block text-[13px]">Services</span>
                            <strong className="text-[14px] font-semibold">{data?.services?.join(", ")}</strong>
                        </li>
                        <li>
                            <span className="block text-[13px]">Timings</span>
                            <strong className="text-[14px] font-semibold">{data?.openCloseTimings?.open} - {data?.openCloseTimings?.close}</strong>
                        </li>
                        <li>
                            <span className="block text-[13px]">Coustmer Service Number</span>
                            <strong className="text-[14px] font-semibold">{data?.customerServiceNumber}</strong>
                        </li>
                    </ul>
                    <div className="info">
                        <label className="mb-2 block text-white">
                            Why do you want to be on Phloii Verified?
                        </label>
                        <p className="mt-2.5 rounded-md bg-black p-4 text-[#c8c8d099]">
                            {data?.why_want_phloi}
                        </p>
                    </div>
                    <div className="info">
                        <label className="mb-2 block text-white">
                            What makes your restaurant unique?
                        </label>
                        <p className="mt-2.5 rounded-md bg-black p-4 text-[#c8c8d099]">
                            {data?.uniqueFeatures}
                        </p>
                    </div>
                    <div className="info">
                        <label className="mb-2 block text-white">
                            Are you open to an in-person visit? If yes, when is a good time to meet?
                        </label>
                        <p className="mt-2.5 rounded-md bg-black p-4 text-[#c8c8d099]">
                            {data?.inPersonVisitAvailability}
                        </p>
                    </div>
                </div>
                <div className="w-80 flex-shrink-0 flex-grow-0 p-6">
                    <div className="flex">
                        <div className="grow">
                            <h4 className="text-[20px] text-white mb-2">{data?.ownerDetails?.ownerName}</h4>
                            {/* <span
                                title="Address"
                                className="flex items-center gap-[3px] text-[14px] text-white"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="6.99854" cy="7" r="6" fill="white"></circle>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0.790939 4.91769L1.17092 4.70909C1.4901 4.53029 1.6573 4.17269 1.5661 3.8449L1.4901 3.4277C1.39891 2.936 1.77889 2.4741 2.28047 2.4443L2.72125 2.4145C3.08603 2.3996 3.40522 2.1463 3.49641 1.8036L3.61801 1.3864C3.7548 0.894704 4.28678 0.641404 4.75796 0.835106L5.16833 0.999002C5.50272 1.1331 5.8827 1.04371 6.1259 0.775507L6.4147 0.447706C6.74907 0.0603074 7.34184 0.0603074 7.6762 0.417906L7.965 0.745708C8.20818 1.01391 8.6034 1.08841 8.93777 0.954303L9.39372 0.790407C9.86491 0.596706 10.4121 0.850005 10.5489 1.32681L10.6705 1.744C10.7617 2.0867 11.0808 2.3251 11.4457 2.34L11.8864 2.3549C12.4032 2.3698 12.7832 2.8317 12.692 3.3234L12.616 3.74059C12.5552 4.0833 12.7376 4.44089 13.0568 4.60479L13.4368 4.81339C13.8775 5.03689 14.0143 5.61799 13.7256 6.02026L13.4672 6.37787C13.2544 6.66097 13.2544 7.06329 13.4672 7.3464L13.7256 7.68906C14.0295 8.09138 13.8927 8.67248 13.4519 8.91086L13.0719 9.11947C12.7528 9.2983 12.5856 9.64096 12.6464 9.99856L12.7224 10.4158C12.8136 10.9075 12.4336 11.3694 11.932 11.3992L11.4912 11.429C11.1265 11.4439 10.8073 11.6972 10.7161 12.0398L10.5945 12.4571C10.4577 12.9488 9.9257 13.202 9.45452 13.0084L9.04413 12.8445C8.70976 12.7104 8.32977 12.7998 8.08659 13.068L7.79779 13.3958C7.46342 13.7831 6.85548 13.7831 6.52106 13.4106L6.23226 13.0829C5.9891 12.8147 5.59391 12.7402 5.25953 12.8743L4.84915 13.0382C4.37797 13.2319 3.8308 12.9785 3.69401 12.5018L3.57241 12.0846C3.48122 11.7419 3.16203 11.5035 2.79725 11.4886L2.35647 11.4737C1.83969 11.4587 1.45971 10.9969 1.5509 10.5052L1.6269 10.088C1.6877 9.74529 1.5053 9.38768 1.18612 9.2238L0.806139 9.01519C0.365359 8.7917 0.228566 8.2106 0.517352 7.80828L0.77574 7.45067C0.98853 7.16757 0.98853 6.7653 0.77574 6.4822L0.517352 6.13948C0.213366 5.73721 0.35016 5.15609 0.790939 4.91769ZM9.6889 3.94575C9.93444 3.94575 10.1511 4.03449 10.3243 4.21197C10.4976 4.37466 10.5843 4.6113 10.5843 4.84794C10.5843 5.08458 10.4832 5.32121 10.3099 5.4987L6.85847 9.32018C6.69961 9.49766 6.46855 9.58637 6.2375 9.58637C6.00645 9.58637 5.78984 9.49766 5.61655 9.32018L3.88363 7.2587C3.71034 7.096 3.62369 6.85937 3.62369 6.62273C3.62369 6.3861 3.71034 6.16424 3.88363 5.98676C4.05692 5.80929 4.28798 5.72052 4.51904 5.72052C4.75009 5.72052 4.96671 5.80929 5.14 5.98676L6.2375 6.96748L9.06793 4.21197C9.22679 4.03449 9.45785 3.94575 9.6889 3.94575Z"
                                        fill="url(#paint0_linear_4575_10290)"
                                    ></path>
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_4575_10290"
                                            x1="0.354004"
                                            y1="6.92075"
                                            x2="13.8889"
                                            y2="6.92075"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stop-color="#FBB90D"></stop>
                                            <stop offset="1" stop-color="#22EBFF"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                Address...
                            </span> */}
                        </div>
                    </div>
                    <ul className="owner_details pt-5">
                        <li className="list-none flex items-center gap-3 pb-3"><img alt="icons" src="/images/mobile_icon.svg" /> <a href="" className="text-white">{data?.ownerDetails?.ownerPhone}</a></li>
                        <li className="list-none flex items-center gap-3 pb-3"><img alt="icons" src="/images/message_icon.svg" /> <a href="" className="text-white">{data?.ownerDetails?.ownerEmail}</a></li>
                        <li className="list-none flex items-center gap-3 pb-3"><img alt="icons" src="/images/globe_icon.svg" /> <a href="" className="text-white">{data?.ownerDetails?.websiteLink}</a></li>
                    </ul>
                    <div className="pt-6">
                        <h4 className="text-[20px] text-white mb-2 pb-4"> Taj Hotel</h4>
                        <img src={data?.images[0]} onClick={() => { setShow_image_preview(true); setImages; (data.images); setIndex(-1) }} className="w-full rounded-md " alt="" />
                        {data?.images?.slice(1, 5).map((image, i) => (
                            <li
                                onClick={() => {
                                    setShow_image_preview(true);
                                    setImages(data.images);
                                    setIndex(i);
                                }}
                                key={i}
                                className="position-relative"
                            >
                                {i === 3 && data?.images?.length > 5 && (
                                    <div className="view-more-overlay">
                                        <p className="view-more-text">View More</p>
                                    </div>
                                )}
                                <img src={image} className="img-fluid" alt={`Hotel Image ${i + 1}`} />
                            </li>
                        ))}
                    </div>
                </div>
            </div>
            {show_image_preview && <ImageGallery images={images} setShow_image_preview={setShow_image_preview} show_image_preview={show_image_preview} index={index} />}
        </div>
    );
};

export default EstablishmentView;
