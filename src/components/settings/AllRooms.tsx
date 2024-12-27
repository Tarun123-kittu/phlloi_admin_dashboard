'use client'

import React,{useState,useEffect} from 'react'
import RoomsCard from './RoomsCard'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import { get_all_rooms,clearRoomState } from '@/redux/slices/settinsSlice/roomSlice/getAllRoomsSlice';
import CreateRoomModal from '@/modals/roomsModal/CreateRoomModal';
import { useRouter } from 'next/navigation';
const AllRooms = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [openAddRoom,setOpenAddRoom] = useState(false)
    const all_rooms_state = useSelector((state:RootState) => state.ALL_ROOMS)
    const router = useRouter()
    useEffect(() => {
        dispatch(get_all_rooms())
      },[])
  return (
    <div>
    <div className='flex items-center'>
        <h1 className='font-bold text-xl text-white grow flex gap-2'> <img onClick={() => router.push("/app-settings")} src="https://img.icons8.com/?size=100&id=AO1h97ca7e0A&format=png&color=FFFFFF" alt="back button" width={30} height={30} style={{ cursor: "pointer" }} />Rooms List</h1>
        <button onClick={() => setOpenAddRoom(true)} type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black  bg-gradient-to-r from-[#fbb90d] to-[#22ebff] rounded-lg cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New Room</button>
    </div>
    <div className="grid grid-cols-3 gap-4">
    {Array.isArray(all_rooms_state?.data) && all_rooms_state?.data?.map((room,i) => {
      return (
        <div key={i} className='border rounded-lg mt-4'>
        <RoomsCard image={room?.image} joined_user={room?.joined_user_count} room={room?.room} id={room?._id}/>
        </div>
      )
    })}
    </div>
    {openAddRoom && <CreateRoomModal isOpen={openAddRoom} setIsOpen={setOpenAddRoom}/>}
</div>
  )
}

export default AllRooms