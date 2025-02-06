'use client'
import React, { useState, useEffect, useRef } from 'react'
import UserFilter from "../filters/userFilter"
import Pagination from "../pagination/pagination"
import Loader from "../loader/Loader"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { useRouter } from "next/navigation";
import { get_all_hotel_verification_requests, clear_hotel_varification_details_state } from '@/redux/slices/hotelSlice/getAllHotelVerificationRequests'
import DeleteModal from '@/modals/deleteModal/deleteModal'
import { delete_establishment, clear_deleted_establishment_state } from '@/redux/slices/hotelSlice/deleteEstablishmentSlice'
import toast from 'react-hot-toast'


const EstablishmentList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState([])
  const [showVerifiedHotel, setShowVerifiedHotel] = useState<boolean | null>(null);
  const [establishmentId, setEstablishmentId] = useState<string>("")
  const [isOpenDeleteSelectionModal, setIsOpenDeleteSelectionModal] = useState<boolean>(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const is_establishment_deleted = useSelector((store: RootState) => store.DELETE_ESTABLISHMENT)

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const router = useRouter()

  const verification_hotel_requests = useSelector((state: RootState) => state.ALL_VARIFICATION_HOTELS);

  useEffect(() => {
    dispatch(get_all_hotel_verification_requests({
      showVerifiedHotel: showVerifiedHotel,
      page
    }));
    dispatch(clear_deleted_establishment_state())
  }, [page, showVerifiedHotel]);



  const formatDate = (dateString: number) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  useEffect(() => {
    if (verification_hotel_requests.isSuccess && verification_hotel_requests.hotels) {
      const allRequests: any = verification_hotel_requests.hotels.requests;
      setData(allRequests);
    }
  }, [verification_hotel_requests]);

  const handleDeleteSection = () => {
    setIsOpenDeleteSelectionModal(true)
  }

  const deleteEstablishment = () => {
    dispatch(delete_establishment({ establishmentId }))
  }

  useEffect(() => {
    if (is_establishment_deleted?.isSuccess) {
      dispatch(clear_deleted_establishment_state())
      dispatch(get_all_hotel_verification_requests({
        showVerifiedHotel: showVerifiedHotel,
        page
      }));
      setIsOpenDeleteSelectionModal(false)
      toast.success("Establishment deleted successfully")
    }
    if (is_establishment_deleted?.isError) {
      dispatch(clear_deleted_establishment_state())
      toast.error("Error while deleting establishment, Please try again later")
    }
  }, [is_establishment_deleted])

  return (
    <div>

      <div className='flex justify-end mb-3 gap-2'>
        <div className="flex items-center mb-4">
          <input id="default-radio-1" type="radio" checked={showVerifiedHotel === null} onChange={() => setShowVerifiedHotel(null)} className="w-4 h-4 text-yellow-600 cursor-pointer accent-yellow-400 bg-gray-100 border-gray-300  dark:focus:ring-yellow-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-white dark:text-white">Pending</label>
        </div>
        <div className="flex items-center mb-4">
          <input id="default-radio-1" type="radio" checked={showVerifiedHotel ? true : false} onChange={() => setShowVerifiedHotel(true)} name="default-radio" className="w-4 h-4 cursor-pointer accent-yellow-400 text-yellow-600 bg-gray-100 border-gray-300  dark:focus:ring-yellow-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-white dark:text-white">Approved</label>
        </div>
        <div className="flex items-center mb-4">
          <input id="default-radio-1" type="radio" checked={showVerifiedHotel === null ? false : showVerifiedHotel === false ? true : false} onChange={() => setShowVerifiedHotel(false)} name="default-radio" className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 accent-yellow-400  dark:focus:ring-yellow-600 cursor-pointer dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-white dark:text-gray-white">Rejected</label>
        </div>
        {/* <div className="relative" ref={dropdownRef}>
          <button
            id="dropdownCheckboxButton"
            onClick={toggleDropdown}
            className="text-white bg-cardBg  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Filters
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
            id="dropdownDefaultCheckbox"
            className={`z-10 ${isDropdownOpen ? "block" : "hidden"
              } w-48 bg-cardBg divide-y divide-gray-100 border border-[#fdfdfd3d] rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute mt-2 right-0`}
          >
            <ul
              className=" space-y-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownCheckboxButton"
            >

              <li className='border-b border-[#fdfdfd3d] p-3'>
                <div className="flex items-center">
                  <input
                    id="checkbox-item-2"
                    type="checkbox"
                    checked={showVerifiedHotel ?? false} 
                    onChange={() => setShowVerifiedHotel(true)}
                    className="w-4 h-4 text-blue-600 accent-yellow-500 bg-gray-100 border-gray-300 rounded"
                  />

                  <label
                    htmlFor="checkbox-item-2"
                    className="ms-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    verified
                  </label>
                </div>
              </li>
              <li className='p-3 mt-0' style={{ marginTop: "0" }}>
                <div className="flex items-center">
                  <input
                    checked={showVerifiedHotel !== null && !showVerifiedHotel} onChange={() => setShowVerifiedHotel(false)}
                    id="checkbox-item-3"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 accent-yellow-500 bg-gray-100 border-gray-300 rounded "
                  />
                  <label
                    htmlFor="checkbox-item-3"
                    className="ms-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    Not verified
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div> */}
      </div>

      <div className="rounded-[10px] bg-cardBg p-2 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left ">
                <th className="min-w-[220px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white xl:pl-7.5 text-sm">
                  Establishment Name
                </th>
                {/* <th className="min-w-[120px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white text-sm">
                                    Establishment Type

                                </th> */}
                <th className="min-w-[120px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white text-sm">
                  Country
                </th>
                <th className="min-w-[120px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white text-sm">
                  State
                </th>
                <th className="min-w-[120px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white text-sm">
                  Verification Status

                </th>
                <th className="min-w-[120px] border-[#fdfdfd3d] border-b px-4  py-4 font-medium text-white dark:text-white text-sm">
                  Action

                </th>
              </tr>
            </thead>
            <tbody>
              {verification_hotel_requests?.isLoading ? <td className="h-60 relative" colSpan={6}><Loader /></td> : data?.length === 0 ? <td className="h-60 relative" colSpan={6}><h1 className='text-white text-center'>No Data Found</h1></td> : Array?.isArray(data) && data?.map((data: any, index: number) => (
                <tr key={index}>
                  <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 xl:pl-7.5 border-b">
                    <h5 className="text-white dark:text-white text-xs">{data?.establishmentName}</h5>
                  </td>
                  {/* <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b">
                                        <p className="text-white dark:text-white text-xs">{data?.establishmentType}</p>
                                    </td> */}
                  <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b">
                    <p className="text-white dark:text-white text-xs">{data?.address?.country}</p>
                  </td>
                  <td className="border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b">
                    <p className="text-white dark:text-white text-xs">{data?.address?.state}</p>
                  </td>
                  <td
                    className={`border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 border-b`}
                    title="View Details"
                  >
                    <p className="text-white dark:text-white text-xs">{data?.adminVerified === null ? "Pending" : data?.adminVerified ? "Approved" : "Rejected"}</p>
                  </td>
                  <td
                    className={`border-[#fdfdfd3d] border-b px-4 py-4 dark:border-dark-3 `}
                    title="View Details"
                    onClick={() => router.push(`/establishment-view/${data?._id}`)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </td>
                  <td>
                    <div
                      title="Delete Section"
                      className="cursor-pointer"
                      onClick={() => {
                        handleDeleteSection();
                        setEstablishmentId(data?._id);
                      }}
                    >
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5H17M7 9V15M11 9V15M2 5L3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5"
                          stroke="#666C78"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {verification_hotel_requests?.hotels?.currentPage !== undefined && verification_hotel_requests?.hotels?.totalPages > 1 && (
            <Pagination
              totalPages={verification_hotel_requests?.hotels?.totalPages || 0}
              currentPage={verification_hotel_requests?.hotels?.currentPage || 0}
              setPage={setPage}
            />
          )}
        </div>
      </div>
      {isOpenDeleteSelectionModal && <DeleteModal isModalOpen={isOpenDeleteSelectionModal} setIsModalOpen={setIsOpenDeleteSelectionModal} handleDelete={deleteEstablishment} loading={is_establishment_deleted?.isLoading}/>}
    </div>
  );
}

export default EstablishmentList;
