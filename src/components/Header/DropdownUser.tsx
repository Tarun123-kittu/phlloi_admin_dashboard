import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import { useRouter } from "next/navigation";
import ChangePasswordModal from "../../modals/changePasswordModal/changePasswordModal"

const DropdownUser = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src="/images/user/user_image.jpg"
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
            className="overflow-hidden rounded-full"
          />
        </span>

        <span className="flex items-center gap-2 font-medium text-white dark:text-dark-6">
          <span className="hidden lg:block">{localStorage.getItem('username')}</span>

          <svg
            className={`fill-current duration-200 ease-in ${dropdownOpen && "rotate-180"}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.6921 7.09327C3.91674 6.83119 4.3113 6.80084 4.57338 7.02548L9.99997 11.6768L15.4266 7.02548C15.6886 6.80084 16.0832 6.83119 16.3078 7.09327C16.5325 7.35535 16.5021 7.74991 16.24 7.97455L10.4067 12.9745C10.1727 13.1752 9.82728 13.1752 9.59322 12.9745L3.75989 7.97455C3.49781 7.74991 3.46746 7.35535 3.6921 7.09327Z"
              fill=""
            />
          </svg>
        </span>
      </Link>

      {/* <!-- Dropdown Star --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-3 flex w-[210px] flex-col rounded-lg border-[0.5px] border-stroke bg-cardBg shadow-default dark:border-dark-3 dark:bg-gray-dark`}
        >
          <div className="">
            <button onClick={() => setIsOpen(true)} className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-normal text-white  duration-300 ease-in-out  dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white ">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 10.5C1.5 12.28 2.02784 14.0201 3.01677 15.5001C4.00571 16.9802 5.41131 18.1337 7.05585 18.8149C8.70038 19.4961 10.51 19.6743 12.2558 19.3271C14.0016 18.9798 15.6053 18.1226 16.864 16.864C18.1226 15.6053 18.9798 14.0016 19.3271 12.2558C19.6743 10.51 19.4961 8.70038 18.8149 7.05585C18.1337 5.41131 16.9802 4.00571 15.5001 3.01677C14.0201 2.02784 12.28 1.5 10.5 1.5C8.7483 1.49943 7.03451 2.01005 5.56878 2.96925C4.10305 3.92846 2.9491 5.29454 2.24842 6.9M1.5 4.34211L1.95 7.35L4.81579 6.71053" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.3947 9.55261V8.13155C12.3947 7.62904 12.1951 7.1471 11.8398 6.79177C11.4845 6.43644 11.0025 6.23682 10.5 6.23682C9.99749 6.23682 9.51556 6.43644 9.16023 6.79177C8.80489 7.1471 8.60527 7.62904 8.60527 8.13155V9.55261M11.2105 14.7631H9.78948C8.67822 14.7631 8.12211 14.7631 7.74032 14.4694C7.64175 14.3938 7.55353 14.3056 7.4779 14.207C7.18422 13.8243 7.18422 13.2691 7.18422 12.1579C7.18422 11.0466 7.18422 10.4905 7.4779 10.1087C7.55353 10.0101 7.64175 9.92192 7.74032 9.84629C8.12306 9.55261 8.67822 9.55261 9.78948 9.55261H11.2105C12.3218 9.55261 12.8779 9.55261 13.2597 9.84629C13.3583 9.92192 13.4465 10.0101 13.5221 10.1087C13.8158 10.4914 13.8158 11.0466 13.8158 12.1579C13.8158 13.2691 13.8158 13.8252 13.5221 14.207C13.4465 14.3056 13.3583 14.3938 13.2597 14.4694C12.877 14.7631 12.3218 14.7631 11.2105 14.7631Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>


              Change Password
            </button>
          </div>
          <div className="">
            <button onClick={() => handleLogout()} className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-normal text-white  duration-300 ease-in-out  dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white ">
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1815_13085)">
                  <path
                    d="M11.209 0.9375C10.1833 0.937485 9.35657 0.937473 8.70635 1.02489C8.03127 1.11566 7.46286 1.30983 7.01142 1.76126C6.61773 2.15496 6.4188 2.63877 6.31437 3.20727C6.2129 3.75969 6.19349 4.43572 6.18897 5.24687C6.18724 5.55753 6.43768 5.81076 6.74833 5.81249C7.05899 5.81422 7.31223 5.56379 7.31396 5.25313C7.31852 4.43301 7.33982 3.8517 7.42086 3.41051C7.49895 2.9854 7.62433 2.73935 7.80692 2.55676C8.01449 2.34919 8.30592 2.21385 8.85625 2.13986C9.42276 2.0637 10.1736 2.0625 11.2502 2.0625H12.0002C13.0767 2.0625 13.8276 2.0637 14.3941 2.13986C14.9444 2.21385 15.2358 2.34919 15.4434 2.55676C15.651 2.76433 15.7863 3.05576 15.8603 3.60609C15.9365 4.1726 15.9377 4.92344 15.9377 6V12C15.9377 13.0766 15.9365 13.8274 15.8603 14.3939C15.7863 14.9442 15.651 15.2357 15.4434 15.4432C15.2358 15.6508 14.9444 15.7862 14.3941 15.8601C13.8276 15.9363 13.0767 15.9375 12.0002 15.9375H11.2502C10.1736 15.9375 9.42276 15.9363 8.85625 15.8601C8.30592 15.7862 8.01449 15.6508 7.80692 15.4432C7.62433 15.2607 7.49895 15.0146 7.42086 14.5895C7.33982 14.1483 7.31852 13.567 7.31396 12.7469C7.31223 12.4362 7.05899 12.1858 6.74833 12.1875C6.43768 12.1892 6.18724 12.4425 6.18897 12.7531C6.19349 13.5643 6.2129 14.2403 6.31437 14.7927C6.4188 15.3612 6.61773 15.845 7.01142 16.2387C7.46286 16.6902 8.03127 16.8843 8.70635 16.9751C9.35657 17.0625 10.1833 17.0625 11.209 17.0625H12.0413C13.067 17.0625 13.8937 17.0625 14.544 16.9751C15.2191 16.8843 15.7875 16.6902 16.2389 16.2387C16.6903 15.7873 16.8845 15.2189 16.9753 14.5438C17.0627 13.8936 17.0627 13.0668 17.0627 12.0412V5.95885C17.0627 4.93316 17.0627 4.10641 16.9753 3.45619C16.8845 2.78111 16.6903 2.2127 16.2389 1.76126C15.7875 1.30983 15.2191 1.11566 14.544 1.02489C13.8938 0.937473 13.067 0.937485 12.0413 0.9375H11.209Z"
                    fill=""
                  />
                  <path
                    d="M11.25 8.4375C11.5607 8.4375 11.8125 8.68934 11.8125 9C11.8125 9.31066 11.5607 9.5625 11.25 9.5625H3.02058L4.49107 10.8229C4.72694 11.0251 4.75426 11.3802 4.55208 11.6161C4.34991 11.8519 3.9948 11.8793 3.75893 11.6771L1.13393 9.42708C1.00925 9.32022 0.9375 9.16421 0.9375 9C0.9375 8.83579 1.00925 8.67978 1.13393 8.57292L3.75893 6.32292C3.9948 6.12074 4.34991 6.14806 4.55208 6.38393C4.75426 6.6198 4.72694 6.97491 4.49107 7.17708L3.02058 8.4375H11.25Z"
                    fill=""
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1815_13085">
                    <rect width="18" height="18" rx="5" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
      <ChangePasswordModal setIsOpen={setIsOpen} isOpen={isOpen}/>
    </ClickOutside>
  );
};

export default DropdownUser;
