"use client";
import UserFilter from "../filters/userFilter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { UsersList, clear_all_user_state } from "../../redux/slices/userSlice/userListSlice";
import Pagination from "../pagination/pagination";
import Loader from "../loader/Loader";
import { useRouter } from "next/navigation";
import DeleteModal from "@/modals/deleteModal/deleteModal";
import { delete_app_user, clear_deleted_app_user_state } from "@/redux/slices/userSlice/deleteUserSlice";
import toast from "react-hot-toast";

export interface Pagination {
  currentPage: number;
  totalPages: number;
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  createdAt: number;
  gender: string;
  online_status: boolean;
  verified_profile: boolean;
}

export interface UserState {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
  users: {
    pagination: Pagination;
    users: UserData[];
  } | null;
}

const TableThree = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [userdata, setUserData] = useState<any>();
  const [userId, setUserId] = useState<string>("")
  const [isOpenDeleteSelectionModal, setIsOpenDeleteSelectionModal] = useState<boolean>(false)
  const is_user_deleted = useSelector((store: RootState) => store.DELETE_APP_USER)
  const router = useRouter();

  useEffect(() => {
    dispatch(UsersList({ page, verified: verified ?? undefined, gender, username }));
    dispatch(clear_deleted_app_user_state())
  }, [page]);

  useEffect(() => {
    if (username === "" && verified === null && gender === "") {
      setIsSearched(false)
    }
  }, [username])

  const usersData = useSelector((state: RootState) => state.USERLIST);

  const formatDate = (dateString: number) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const handleSearch = (e: React.FormEvent) => {
  };

  useEffect(() => {
    dispatch(clear_all_user_state())
    if (username !== "" || verified !== null || gender !== "") {
      setIsSearched(true);
    }
    dispatch(
      UsersList({ page, verified: verified ?? undefined, gender, username }),
    );
  }, [page, verified, gender, username])

  const clearResult = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clear_all_user_state())
    setIsSearched(false);
    setVerified(null);
    setUsername("");
    setGender("");
    dispatch(UsersList({ page: 1 }));
  };

  useEffect(() => {
    if (usersData?.isSuccess) {
      setUserData(usersData)
    }
  }, [usersData]);

  const handleDeleteSection = () => {
    setIsOpenDeleteSelectionModal(true)
  }


  const deleteUser = () => {
    dispatch(delete_app_user({ userId }))
  }

  useEffect(() => {
    if (is_user_deleted?.isSuccess) {
      dispatch(clear_deleted_app_user_state())
      dispatch(UsersList({ page, verified: verified ?? undefined, gender, username }));
      setIsOpenDeleteSelectionModal(false)
      toast.success("User deleted successfully")
    }
    if (is_user_deleted?.isError) {
      dispatch(clear_deleted_app_user_state())
      toast.error("Error while deleting user, Please try again later")
    }
  }, [is_user_deleted])

  return (
    <>
      <UserFilter
        setVerified={setVerified}
        setUsername={setUsername}
        setGender={setGender}
        verified={verified}
        username={username}
        gender={gender}
        handleSearch={handleSearch}
        clearResult={clearResult}
        isSearched={isSearched}
      />

      <div className="rounded-[10px]  bg-cardBg p-2 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="min-w-[220px] border-b border-[#fdfdfd3d] px-4 py-4 text-sm font-medium text-white dark:text-white xl:pl-7.5">
                  Username
                </th>
                <th className="min-w-[150px] border-b border-[#fdfdfd3d] px-4 py-4 text-sm font-medium text-white dark:text-white">
                  Email
                </th>
                <th className="min-w-[120px] border-b border-[#fdfdfd3d] px-4 py-4 text-sm font-medium text-white dark:text-white">
                  Created At
                </th>
                <th className="min-w-[120px] border-b border-[#fdfdfd3d] px-4 py-4 text-sm font-medium text-white dark:text-white">
                  Gender
                </th>
                <th className="border-b border-[#fdfdfd3d] px-4 py-4  text-sm font-medium text-white dark:text-white xl:pr-7.5">
                  Online Status
                </th>
                <th className="border-b border-[#fdfdfd3d] px-4 py-4  text-sm font-medium text-white dark:text-white xl:pr-7.5">
                  Verified Profile
                </th>
                <th className="border-b border-[#fdfdfd3d] px-4 py-4  text-sm font-medium text-white dark:text-white xl:pr-7.5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>

              {usersData?.isLoading && !isSearched ? (
                <td className={`${userdata?.users?.pagination?.totalPages > 1 ? "h-screen" : "h-40"} relative min-h-screen	`} colSpan={7}>
                  <Loader />
                </td>
              ) : usersData?.error === "No user found" ? (
                <td className="relative h-60" colSpan={6}>
                  <h1 className="text-center text-white">No Data Found</h1>
                </td>
              ) : (
                userdata?.users?.users?.map(
                  (data: UserData, index: number) => (
                    <tr key={index}>
                      <td
                        className={`border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3 xl:pl-7.5`}
                      >
                        <h5 className="text-xs text-white dark:text-white">
                          {data?.username}
                        </h5>
                      </td>
                      <td
                        className={`border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3`}
                      >
                        <p className="text-xs text-white dark:text-white">
                          {data.email}
                        </p>
                      </td>
                      <td
                        className={`border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3`}
                      >
                        <p className="text-xs text-white dark:text-white">
                          {formatDate(data.createdAt)}
                        </p>
                      </td>
                      <td
                        className={`border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3`}
                      >
                        <p className="text-xs text-white dark:text-white">
                          {data.gender}
                        </p>
                      </td>
                      <td
                        className={`border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3`}
                      >
                        <p className="text-xs text-white dark:text-white">
                          {data.online_status ? "True" : "False"}
                        </p>
                      </td>
                      <td
                        className={`border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3`}
                      >
                        <p className="text-xs text-white dark:text-white">
                          {data.verified_profile ? "True" : "False"}
                        </p>
                      </td>
                      <td
                        className={`border-b border-[#fdfdfd3d] px-4 py-4 dark:border-dark-3`}
                        title="View Details"

                      >
                        <div className="flex items-center gap-3">
                          <svg
                            onClick={() =>
                              router.push(`/user_details/${data?._id}`)
                            }
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-6 cursor-pointer"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>

                          <div
                            title="Delete Section"
                            className="cursor-pointer"
                            onClick={() => {
                              handleDeleteSection();
                              setUserId(data?._id);
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
                        </div>
                      </td>

                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
          {userdata && !usersData?.isError &&
            userdata?.users?.pagination?.totalPages > 1 && (
              <Pagination
                totalPages={userdata?.users?.pagination?.totalPages || 0}
                currentPage={userdata?.users?.pagination?.currentPage}
                setPage={setPage}
              />
            )}
        </div>
        {isOpenDeleteSelectionModal && <DeleteModal isModalOpen={isOpenDeleteSelectionModal} setIsModalOpen={setIsOpenDeleteSelectionModal} handleDelete={deleteUser} loading={is_user_deleted?.isLoading} />}
      </div >
    </>
  );
};

export default TableThree;
