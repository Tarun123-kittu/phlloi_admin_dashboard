'use client'

import React, { useState, useEffect } from "react";
import { get_room_by_id, clearGetRoomState } from "@/redux/slices/settinsSlice/roomSlice/getRoomBydId";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import { update_room, clearUpdateState } from "@/redux/slices/settinsSlice/roomSlice/updateRoomSlice";
import toast from "react-hot-toast";
import { get_all_rooms } from "@/redux/slices/settinsSlice/roomSlice/getAllRoomsSlice";

interface EditRoomProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    id: string;
}

const EditRoomModal: React.FC<EditRoomProps> = ({ setIsOpen, isOpen, id }) => {
    const [image, setImage] = useState<string>("https://via.placeholder.com/100");
    const [text, setText] = useState<string>("");
    const [saveImage, setSaveImage] = useState<string>("https://via.placeholder.com/100");

    const dispatch = useDispatch<AppDispatch>();
    const get_room_state = useSelector((state: RootState) => state.ROOM_DETAILs);
    const is_room_updated = useSelector((state: RootState) => state.UPDATE_ROOM);

    useEffect(() => {
        dispatch(get_room_by_id({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        if (get_room_state?.isSuccess) {
            setImage(get_room_state?.data?.data?.image);
            setText(get_room_state?.data?.data?.room);
        }
    }, [get_room_state]);

    useEffect(() => {
        if (is_room_updated?.isSuccess) {
            toast.success("Room Updated successfully");
            dispatch(get_all_rooms());
            dispatch(clearUpdateState());
            setIsOpen(false);
        }
    }, [is_room_updated, dispatch, setIsOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target.files?.[0];
        setSaveImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImage("https://via.placeholder.com/100");
        }
    };

    const handleSubmit = () => {
        if (!text) {
            toast.error("Please Provide Room Name");
            return;
        }
        if (!image) {
            toast.error("Please Provide Image");
            return;
        }
        dispatch(update_room({ room: text, image: saveImage, id }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center shadow-lg" style={{ backgroundColor: '#000000c4' }}>
            <div className="p-6 rounded-lg bg-black shadow-xl w-full max-w-lg dark:bg-gray-dark">
                <div className="justify-between flex">
                    <h1 className="font-medium text-2xl text-white mb-3">Edit Room</h1>
                    <button
                        onClick={() => setIsOpen(false)}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className="w-full pb-4">
                    <img src={image} alt="Preview" className="w-full h-[250px] object-cover" />
                </div>

                <div className="mb-3">
                    <label htmlFor="image-input" className="block text-sm text-white dark:text-gray-300 mb-1">Upload Image</label>
                    <input
                        id="image-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="px-4 py-3 bg-cardBg dark:bg-gray-700 text-white dark:text-white w-full text-sm dark:border-gray-600 focus:border-[#007bff] outline-none"
                        style={{ borderRadius: '10px' }}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="text-input" className="block text-sm text-white dark:text-gray-300 mb-1">Room Name</label>
                    <input
                        id="text-input"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter room name"
                        className="px-4 py-3 bg-cardBg dark:bg-gray-700 text-white dark:text-white w-full text-sm dark:border-gray-600 focus:border-[#007bff] outline-none"
                        style={{ borderRadius: '10px' }}
                    />
                </div>

                <div className="sm:flex sm:flex-row-reverse sm:gap-4">
                    <button
                        onClick={handleSubmit}
                        className="py-3 text-center text-sm font-medium text-black rounded bg-gradient-to-r from-[#fbb90d] to-[#22ebff] w-full"
                    >
                        Submit
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-cardBg text-base font-normal text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditRoomModal;
