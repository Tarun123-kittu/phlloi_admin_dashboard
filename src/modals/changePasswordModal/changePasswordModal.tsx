'use client'

import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux";
import { Change_password, clearChangePasswordState } from "../../redux/slices/authSlice/changePassword"

interface ChangePasswordModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ setIsOpen, isOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [password, setPassword] = useState<string>()
  const [newPassword, setNewPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const change_password_state = useSelector((state: RootState) => state.CHANGE_PASSWORD);

  useEffect(() => {
    if (change_password_state?.isSuccess) {
      toast.success(change_password_state.message)
      setPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setIsOpen(false)
      dispatch(clearChangePasswordState())
    }
    if (change_password_state?.isError) {
      toast.error(change_password_state.error)
      dispatch(clearChangePasswordState())
    }
  }, [change_password_state])

  const handleChangePAssword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) {
      toast.error("Please enter your current Password")
      return
    }
    if (!newPassword) {
      toast.error("Please enter your new Password")
      return
    }
    if (!validator.isStrongPassword(newPassword)) {
      toast.error("Your New Password doesn't seems to be strong")
      return
    }
    if (!confirmPassword) {
      toast.error("Please enter your current Password")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("Your confirm password not matched with new passwrod")
      return
    }
    dispatch(Change_password({ password: password, newPassword: newPassword, confirmPassword: confirmPassword }))
  }

  return (
    <div>
      {isOpen && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden={!isOpen}
          className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(152, 152, 152, 0.6)',
          }}
        >
          <div className="relative p-6 w-1/3 max-w-sm bg-black rounded-lg shadow-lg dark:bg-gray-700 mx-auto">
            <div className="flex items-center justify-between px-4  dark:border-gray-600">
              <h3 className="text-xl font-semibold text-white dark:text-white">Change Password</h3>
              <button
                onClick={toggleModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
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
            <div className="p-4">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="bg-cardBg mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="*********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    New password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-cardBg mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className='mb-6'>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-cardBg mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {!change_password_state?.isLoading ? <button
                  onClick={(e) => handleChangePAssword(e)}
                  className="py-3 mb-4 text-center text-sm font-medium text-black rounded  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] w-full"
                >
                  Update Password
                </button>
                  :
                  <button disabled type="button" className="py-3 mb-4 text-center text-sm font-medium text-black rounded  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] w-full">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    Loading...
                  </button>}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordModal;
