'use client'

import React,{useState,useEffect} from 'react'
import RoomsCard from './RoomsCard'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import { get_all_rooms,clearRoomState } from '@/redux/slices/settinsSlice/roomSlice/getAllRoomsSlice';
import CreateRoomModal from '@/modals/roomsModal/CreateRoomModal';

const AllRooms = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [openAddRoom,setOpenAddRoom] = useState(false)
    const all_rooms_state = useSelector((state:RootState) => state.ALL_ROOMS)

    useEffect(() => {
        dispatch(get_all_rooms())
      },[])
  return (
    <div>
    <div>
        <h1 className='font-bold text-xl text-black'>Rooms List</h1>
        <button onClick={() => setOpenAddRoom(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>
    </div>
    <div className="grid grid-cols-3 gap-4">
    {Array.isArray(all_rooms_state?.data) && all_rooms_state?.data?.map((room,i) => {
      return (
        <div className='border rounded-lg mt-4'>
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