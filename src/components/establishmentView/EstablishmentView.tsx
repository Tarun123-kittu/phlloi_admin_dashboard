'use client'

import type { AppDispatch, RootState } from "@/redux";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_selected_hotel_details, clear_selected_hotel_details } from "@/redux/slices/hotelSlice/getSelectedHotelDetails";
import ImageGallery from "../../components/imageGallery/ImageGallery"
import { verify_hotel, clearVerifyHotelState } from "@/redux/slices/hotelSlice/verifyHotel";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const EstablishmentView = ({ hotelId }: { hotelId: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<any>();
    const [images, setImages] = useState()
    const [index, setIndex] = useState<Number>(1)
    const [show_image_preview, setShow_image_preview] = useState(false)
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter()

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const hotel_details = useSelector(
        (state: RootState) => state.SELECTED_HOTEL_DETAILS
    );

    const is_hotel_verified = useSelector(
        (state: RootState) => state.VERIFY_HOTEl
    );


    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownVisible(false);
        }

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
            toggleDropdown()
            dispatch(clearVerifyHotelState())
            dispatch(get_selected_hotel_details(hotelId));
        }
        if (is_hotel_verified?.isError) {
            toggleDropdown()
            dispatch(clearVerifyHotelState())
        }

        if (is_hotel_verified.isLoading) {
            toast.promise(
                new Promise<void>((resolve, reject) => {
                    setTimeout(() => {
                        const success = true;
                        if (success) resolve();
                        else reject();
                    }, 2000);
                }),
                {
                    loading: 'Saving...',
                    success: <b>Verification status updated</b>,
                    error: <b>Could not save.</b>,
                }
            );
        }
    }, [is_hotel_verified])

    const formatTime = (time: any) => {
        if (time) {
            const [hours, minutes] = time?.split(':')?.map(Number);
            const isPM = hours >= 12;
            const formattedHours = hours % 12 || 12; 
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const period = isPM ? 'PM' : 'AM';

            return `${formattedHours}:${formattedMinutes} ${period}`;
        }
    };


    return (
        <div className="mx-auto  w-full">
            <h1 className='font-bold text-xl text-white grow flex gap-2'><img onClick={() => router.push("/establishment-verification")} src="https://img.icons8.com/?size=100&id=AO1h97ca7e0A&format=png&color=FFFFFF" alt="back button" width={30} height={30} style={{ cursor: "pointer" }} />Establishments</h1>
            <div className="flex bg-cardBg mt-4">
                <div className="p-6 flex-grow border-r">
                    <div className="flex gap-3">
                        <img
                            src={data?.images[0]}
                            alt="ffdg"
                            className="h-10 w-10 flex-shrink-0 flex-grow-0 rounded-full"
                        />
                        <div className="grow">
                            <h4 className="m-0 text-[20px] text-white">{data?.establishmentName}</h4>
                            <span
                                title={data?.address?.streetAddress}
                                className="flex text-white items-center gap-[3px] text-[14px]"
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
                        <div className="relative inline-block flex gap-2 items-center">
                            {(data?.adminVerified === null || !data?.adminVerified) ? <button onClick={() => dispatch(verify_hotel({ hotelId: data?._id, verificationStatus: true }))} className="bg-green-300 text-sm min-w-20 text-white py-2 px-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
                                Approve
                            </button> : <button className="bg-green-700 text-sm min-w-20 text-white py-2 px-2 rounded focus:outline-none  cursor-not-allowed">
                                Approved
                            </button>}

                            {(data?.adminVerified === null || data?.adminVerified) ? <button onClick={() => dispatch(verify_hotel({ hotelId: data?._id, verificationStatus: false }))} className="bg-red-400 text-sm min-w-20 text-white py-2 px-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
                                Reject
                            </button> : <button className="bg-red-700 text-sm min-w-20 text-white py-2 px-2 rounded focus:outline-none cursor-not-allowed">
                                Rejected
                            </button>}

                        </div>
                    </div>

                    <ul className="mb-5 mt-4 flex justify-between text-white gap-3">
                        <li>
                            <span className="block text-[13px]">Country</span>
                            <strong className="text-[14px] font-semibold mb-3 block">
                                {data?.address?.country}
                            </strong>
                            <span className="block text-[13px]">City</span>
                            <strong className="text-[14px] font-semibold">{data?.address?.city}</strong>
                        </li>
                        <li>
                            <span className="block text-[13px]">State</span>
                            <strong className="text-[14px] font-semibold mb-3 block">{data?.address?.state}</strong>

                            <span className="block text-[13px]">Timings</span>
                            <strong className="text-[14px] font-semibold">{formatTime(data?.openCloseTimings?.open)} - {formatTime(data?.openCloseTimings?.close)}</strong>

                        </li>
                        <li>
                            <span className="block text-[13px]">Pin/Zip Code</span>
                            <strong className="text-[14px] font-semibold mb-3 block">{data?.address?.pinCode}</strong>

                            <span className="block text-[13px]">Coustmer Service Number</span>
                            <strong className="text-[14px] font-semibold">{data?.customerServiceNumber}</strong>
                        </li>
                        <li>
                            <span className="block text-[13px]">Suite/Unit Number</span>
                            <strong className="text-[14px] font-semibold mb-3 block">{data?.address?.suiteUnitNumber}</strong>
                        </li>
                    </ul>

                    <div className="info mb-4">
                        <label className="mb-2 block text-white">
                            Why do you want to be on Phloii Verified?
                        </label>
                        <p className="mt-2.5 rounded-md bg-black p-4 text-[#c8c8d099]">
                            {data?.why_want_phloi}
                        </p>
                    </div>
                    <div className="info mb-4">
                        <label className="mb-2 block text-white">
                            Please describe your atmosphere in great detail.
                        </label>
                        <p className="mt-2.5 rounded-md bg-black p-4 text-[#c8c8d099]">
                            {data?.atmosphere_description}
                        </p>
                    </div>
                    {data?.food && <div className="info mb-4">
                        <label className="mb-2 block text-white">
                            Please explain what kind of food you serve (if you serve food)
                        </label>
                        <p className="mt-2.5 rounded-md bg-black p-4 text-[#c8c8d099]">
                            {data?.food}
                        </p>
                    </div>}
                    {data?.additional_information && <div className="info mb-4">
                        <label className="mb-2 block text-white">
                            Additional Information (Optional)
                        </label>
                        <p className="mt-2.5 rounded-md bg-black p-4 text-[#c8c8d099]">
                            {data?.additional_information}
                        </p>
                    </div>}
                    <div className="info mb-4">
                        <label className="mb-2 block text-white">
                            What makes your restaurant unique?
                        </label>
                        <p className="mt-2.5 rounded-md bg-black p-4 text-[#c8c8d099]">
                            {data?.uniqueFeatures}
                        </p>
                    </div>
                    <div className="info mb-4">
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
                            <span className='verified flex gap-2 items-center text-white text-xs'>
                                {data?.paymentStatus === "completed" ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="6.99854" cy="7" r="6" fill="white" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.790939 4.91769L1.17092 4.70909C1.4901 4.53029 1.6573 4.17269 1.5661 3.8449L1.4901 3.4277C1.39891 2.936 1.77889 2.4741 2.28047 2.4443L2.72125 2.4145C3.08603 2.3996 3.40522 2.1463 3.49641 1.8036L3.61801 1.3864C3.7548 0.894704 4.28678 0.641404 4.75796 0.835106L5.16833 0.999002C5.50272 1.1331 5.8827 1.04371 6.1259 0.775507L6.4147 0.447706C6.74907 0.0603074 7.34184 0.0603074 7.6762 0.417906L7.965 0.745708C8.20818 1.01391 8.6034 1.08841 8.93777 0.954303L9.39372 0.790407C9.86491 0.596706 10.4121 0.850005 10.5489 1.32681L10.6705 1.744C10.7617 2.0867 11.0808 2.3251 11.4457 2.34L11.8864 2.3549C12.4032 2.3698 12.7832 2.8317 12.692 3.3234L12.616 3.74059C12.5552 4.0833 12.7376 4.44089 13.0568 4.60479L13.4368 4.81339C13.8775 5.03689 14.0143 5.61799 13.7256 6.02026L13.4672 6.37787C13.2544 6.66097 13.2544 7.06329 13.4672 7.3464L13.7256 7.68906C14.0295 8.09138 13.8927 8.67248 13.4519 8.91086L13.0719 9.11947C12.7528 9.2983 12.5856 9.64096 12.6464 9.99856L12.7224 10.4158C12.8136 10.9075 12.4336 11.3694 11.932 11.3992L11.4912 11.429C11.1265 11.4439 10.8073 11.6972 10.7161 12.0398L10.5945 12.4571C10.4577 12.9488 9.9257 13.202 9.45452 13.0084L9.04413 12.8445C8.70976 12.7104 8.32977 12.7998 8.08659 13.068L7.79779 13.3958C7.46342 13.7831 6.85548 13.7831 6.52106 13.4106L6.23226 13.0829C5.9891 12.8147 5.59391 12.7402 5.25953 12.8743L4.84915 13.0382C4.37797 13.2319 3.8308 12.9785 3.69401 12.5018L3.57241 12.0846C3.48122 11.7419 3.16203 11.5035 2.79725 11.4886L2.35647 11.4737C1.83969 11.4587 1.45971 10.9969 1.5509 10.5052L1.6269 10.088C1.6877 9.74529 1.5053 9.38768 1.18612 9.2238L0.806139 9.01519C0.365359 8.7917 0.228566 8.2106 0.517352 7.80828L0.77574 7.45067C0.98853 7.16757 0.98853 6.7653 0.77574 6.4822L0.517352 6.13948C0.213366 5.73721 0.35016 5.15609 0.790939 4.91769ZM9.6889 3.94575C9.93444 3.94575 10.1511 4.03449 10.3243 4.21197C10.4976 4.37466 10.5843 4.6113 10.5843 4.84794C10.5843 5.08458 10.4832 5.32121 10.3099 5.4987L6.85847 9.32018C6.69961 9.49766 6.46855 9.58637 6.2375 9.58637C6.00645 9.58637 5.78984 9.49766 5.61655 9.32018L3.88363 7.2587C3.71034 7.096 3.62369 6.85937 3.62369 6.62273C3.62369 6.3861 3.71034 6.16424 3.88363 5.98676C4.05692 5.80929 4.28798 5.72052 4.51904 5.72052C4.75009 5.72052 4.96671 5.80929 5.14 5.98676L6.2375 6.96748L9.06793 4.21197C9.22679 4.03449 9.45785 3.94575 9.6889 3.94575Z" fill="url(#paint0_linear_4575_10290)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_4575_10290" x1="0.354004" y1="6.92075" x2="13.8889" y2="6.92075" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#FBB90D" />
                                            <stop offset="1" stop-color="#22EBFF" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                    :
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.984721 5.45003L1.40584 5.21885C1.75957 5.02069 1.94486 4.62438 1.84379 4.2611L1.75957 3.79874C1.65851 3.25382 2.07962 2.74192 2.63549 2.7089L3.12398 2.67587C3.52825 2.65935 3.88199 2.37864 3.98306 1.99884L4.11781 1.53648C4.26941 0.991559 4.85897 0.71084 5.38116 0.925509L5.83596 1.10715C6.20654 1.25577 6.62766 1.15669 6.89717 0.859459L7.21724 0.496174C7.5878 0.0668405 8.24474 0.0668405 8.6153 0.463149L8.93536 0.826434C9.20486 1.12367 9.64286 1.20623 10.0134 1.05761L10.5187 0.875971C11.0409 0.661302 11.6474 0.942021 11.7989 1.47043L11.9337 1.93279C12.0347 2.31258 12.3885 2.57679 12.7928 2.5933L13.2812 2.60982C13.854 2.62633 14.2751 3.13823 14.174 3.68315L14.0898 4.14551C14.0224 4.52531 14.2245 4.92162 14.5783 5.10325L14.9994 5.33443C15.4879 5.58213 15.6395 6.22613 15.3195 6.67195L15.0331 7.06826C14.7973 7.38201 14.7973 7.82789 15.0331 8.14163L15.3195 8.52139C15.6564 8.96726 15.5047 9.61126 15.0162 9.87545L14.5951 10.1066C14.2414 10.3048 14.0561 10.6846 14.1235 11.0809L14.2077 11.5433C14.3088 12.0882 13.8877 12.6001 13.3318 12.6331L12.8433 12.6661C12.439 12.6826 12.0853 12.9634 11.9842 13.3431L11.8495 13.8055C11.6979 14.3504 11.1083 14.6311 10.5861 14.4165L10.1313 14.2349C9.76074 14.0863 9.33961 14.1853 9.07011 14.4826L8.75005 14.8458C8.37949 15.2751 7.70574 15.2751 7.33511 14.8623L7.01505 14.4991C6.74557 14.2018 6.30761 14.1193 5.93702 14.2679L5.48222 14.4495C4.96004 14.6642 4.35364 14.3834 4.20204 13.8551L4.06728 13.3927C3.96621 13.0129 3.61248 12.7487 3.20821 12.7322L2.71971 12.7157C2.14699 12.6991 1.72588 12.1873 1.82695 11.6423L1.91118 11.18C1.97855 10.8002 1.77641 10.4039 1.42268 10.2223L1.00157 9.99107C0.513073 9.74339 0.361471 9.09939 0.681518 8.65351L0.967876 8.2572C1.2037 7.94345 1.2037 7.49763 0.967876 7.18388L0.681518 6.80407C0.344627 6.35826 0.496228 5.71423 0.984721 5.45003ZM10.8459 4.37288C11.118 4.37288 11.358 4.47122 11.55 4.66792C11.7421 4.84822 11.8382 5.11047 11.8382 5.37272C11.8382 5.63498 11.7261 5.89723 11.534 6.09392L7.70905 10.3291C7.53299 10.5258 7.27692 10.6241 7.02086 10.6241C6.7648 10.6241 6.52474 10.5258 6.33269 10.3291L4.41219 8.04445C4.22014 7.86413 4.12411 7.60189 4.12411 7.33963C4.12411 7.07738 4.22014 6.83151 4.41219 6.63482C4.60424 6.43813 4.86031 6.33976 5.11637 6.33976C5.37244 6.33976 5.61251 6.43813 5.80456 6.63482L7.02086 7.7217L10.1577 4.66792C10.3337 4.47122 10.5898 4.37288 10.8459 4.37288Z" fill="#D9D9D9" />
                                    </svg>}

                                Payment {data?.paymentStatus}</span>
                        </div>
                    </div>
                    <ul className="owner_details pt-5">
                        {data?.ownerDetails?.ownerPhone && <li className="list-none flex items-center gap-3 pb-3"><img alt="icons" src="/images/mobile_icon.svg" /> <a href="" className="text-white text-sm">{data?.ownerDetails?.ownerPhone}</a></li>}
                        {data?.ownerDetails?.ownerEmail && <li className="list-none flex items-center gap-3 pb-3"><img alt="icons" src="/images/message_icon.svg" /> <a href="" className="text-white text-sm">{data?.ownerDetails?.ownerEmail}</a></li>}
                        {data?.ownerDetails?.websiteLink &&
                            <li className="list-none flex items-center gap-3 pb-3">
                                <img alt="icons" src="/images/globe_icon.svg" />
                                <a
                                    href={`http://${data.ownerDetails.websiteLink.replace(/^https?:\/\//, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white text-sm"
                                >
                                    {data?.ownerDetails?.websiteLink}
                                </a>
                            </li>
                        }
                    </ul>
                    <div className="pt-6">
                        <h4 className="text-[20px] text-white mb-2 pb-4"> Restaurant Photos</h4>
                        <img src={data?.images[0]} onClick={() => { setShow_image_preview(true); setImages(data.images); setIndex(-1) }} className="w-full rounded-md h-55 object-cover" alt="" style={{ cursor: "pointer" }} />
                        <ul className="flex gap-2 pt-4">
                            {data?.images?.slice(1, 5).map((image: string, i: number) => (
                                <li
                                    onClick={() => {
                                        setShow_image_preview(true);
                                        setImages(data.images);
                                        setIndex(i);
                                    }}
                                    key={i}
                                    className="w-full relative"
                                >
                                    {i === 3 && data?.images?.length > 5 && (
                                        <div className="bg-[#00000052] view-more-overlay absolute flex items-center justify-center w-full h-18 rounded">
                                            <p className="text-xs text-white">View <br /> More</p>
                                        </div>
                                    )}
                                    <img src={image} className="w-full h-18 rounded object-cover" alt={`Hotel Image ${i + 1}`} style={{ cursor: "pointer" }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {show_image_preview && index !== null && <ImageGallery images={images} setShow_image_preview={setShow_image_preview} show_image_preview={show_image_preview} index={index} />}
        </div>
    );
};

export default EstablishmentView;
