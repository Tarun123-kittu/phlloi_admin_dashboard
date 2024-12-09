'use client'

import React, { useEffect, useState } from "react";
import { add_room,clearAddRoomState } from "@/redux/slices/settinsSlice/roomSlice/addRoomSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import toast from "react-hot-toast";
import { get_all_rooms,clearRoomState } from '@/redux/slices/settinsSlice/roomSlice/getAllRoomsSlice';

interface CreateRoomProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
}

const CreateRoomModal: React.FC<CreateRoomProps> = ({setIsOpen,isOpen}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState<string>("https://via.placeholder.com/100");
  const [text, setText] = useState<string>("");
  const [saveImage,setSaveImage] = useState<string>("https://via.placeholder.com/100")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const is_room_created = useSelector((state:RootState) => state.ADD_ROOM)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSaveImage(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage("https://via.placeholder.com/100"); // Default placeholder
    }
  };

  const handleSubmit = () => {
    if(!text){
      toast.error("Please Provide Room Name")
      return
    }
    if(!image){
      toast.error("Please Provide image")
      return
    }
    dispatch(add_room({room:text ,image:saveImage}))
    setIsModalOpen(false); // Close the modal on submit
  };

  useEffect(() => {
if(is_room_created?.isSuccess){
  toast.success("Room Created Successfully")
  dispatch(clearAddRoomState())
  dispatch(get_all_rooms())
  setIsOpen(false)
}
  },[is_room_created])

  if (!isModalOpen) return null; // Hide modal if not open

  return isOpen && (
    <div className="fixed inset-0 z-10 flex items-center justify-center shadow-lg">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        {/* Modal Content */}
        <div className="p-6">
          {/* Image Preview */}
          <div className="flex justify-center mb-4">
            <img
              src={image}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          </div>

          {/* Image Input */}
          <div className="mb-4">
            <label
              htmlFor="image-input"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Text Input */}
          <div className="mb-4">
            <label
              htmlFor="text-input"
              className="block text-sm font-medium text-gray-700"
            >
              Text
            </label>
            <input
              id="text-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text"
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse">
          {!is_room_created?.isLoading ? <button
            onClick={handleSubmit}
            className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Submit
          </button>
          :
          <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Loading...
            </button>}
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;