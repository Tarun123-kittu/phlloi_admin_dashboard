'use client';

import React, { useState, useEffect } from 'react';
import RoomsCard from './RoomsCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import { get_all_rooms } from '@/redux/slices/settinsSlice/roomSlice/getAllRoomsSlice';
import { useRouter } from 'next/navigation';
import CreateRoomModal from '@/modals/roomsModal/CreateRoomModal';

const Rooms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const all_rooms_state = useSelector((state: RootState) => state.ALL_ROOMS);

  useEffect(() => {
    dispatch(get_all_rooms());
  }, [dispatch]);

  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <p className="font-bold text-2xl">All Rooms</p>
        <button
          onClick={() => setOpenAddRoom(true)}
          type="button"
          className="all-web-btn"
        >
          Add Room
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(all_rooms_state?.data) &&
          all_rooms_state?.data?.slice(0, 3)?.map((room, i) => (
            <div key={room?._id || i} className="border rounded-lg mt-4">
              <RoomsCard
                image={room?.image}
                joined_user={room?.joined_user_count}
                room={room?.room}
                id={room?._id}
              />
            </div>
          ))}
      </div>
      {all_rooms_state?.data?.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => router.push('/room-list')}
            type="button"
            className="text-white mt-4 text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Show All
          </button>
        </div>
      )}
      {openAddRoom && (
        <CreateRoomModal isOpen={openAddRoom} setIsOpen={setOpenAddRoom} />
      )}
    </div>
  );
};

export default Rooms;
