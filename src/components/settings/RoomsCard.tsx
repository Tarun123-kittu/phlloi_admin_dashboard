'use client'

import React,{useState,useEffect} from 'react'
import EditRoomModal from '@/modals/roomsModal/EditRoomModal'

const RoomsCard = ({image,joined_user,room,id} : {image:string,joined_user:number,room:string,id:string}) => {
    const [isOpen,setIsOpen] = useState<boolean>(false)
    return (
        <div>
            <div className=" rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
               
                    <img className="rounded-t-lg w-full h-[300px] object-cover" src={image} alt="" />
               
                <div className="p-5 flex justify-between ">
                    <div>
                        <h5 className="mb-2 text-xl font-medium tracking-tight text-white dark:text-white">Name : {room}</h5>
                            <p className="mb-3 font-normal text-white dark:text-gray-400">User Joined : {joined_user}</p>
                    </div>
                    <div>
                            <a onClick={() => {setIsOpen(true)}} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-hBgColor rounded-lg cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Edit
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                    </div>
                </div>
            </div>
            {isOpen && <EditRoomModal isOpen={isOpen} setIsOpen={setIsOpen} id={id}/>}
        </div>
    )
}

export default RoomsCard