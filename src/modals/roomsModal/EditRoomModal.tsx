'use client'

import React, { useState,useEffect } from "react";
import { get_room_by_id,clearGetRoomState } from "@/redux/slices/settinsSlice/roomSlice/getRoomBydId";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux';
import { update_room,clearUpdateState } from "@/redux/slices/settinsSlice/roomSlice/updateRoomSlice";
import toast from "react-hot-toast";
import { get_all_rooms } from "@/redux/slices/settinsSlice/roomSlice/getAllRoomsSlice";

interface EditRoomProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    id :string
}

const EditRoomModal: React.FC<EditRoomProps> = ({setIsOpen,isOpen,id}) => {
  const [image, setImage] = useState<string>("https://via.placeholder.com/100");
  const [text, setText] = useState<string>("");
  const [saveImage,setSaveImage] = useState<string>("https://via.placeholder.com/100")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();
  const get_room_state = useSelector((state:RootState) => state.ROOM_DETAILs)
  const is_room_updated = useSelector((state:RootState) => state.UPDATE_ROOM)

  useEffect(() => {
      dispatch(get_room_by_id({id}))
    },[])

    useEffect(() => {
        if(get_room_state?.isSuccess){
            setImage(get_room_state?.data?.data?.image)
            setText(get_room_state?.data?.data?.room)
        }
    },[get_room_state])

    useEffect(() => {
        if(is_room_updated?.isSuccess){
            toast.success("Room Updated successfully")
            dispatch(get_all_rooms())
            dispatch(clearUpdateState())
            setIsOpen(false)
        }
      },[is_room_updated])

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
      setImage("https://via.placeholder.com/100"); 
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
    dispatch(update_room({room :text, image:saveImage, id}))
    setIsModalOpen(false); 
  };

  if (!isModalOpen) return null; 



  return isOpen && (
    <div   className="fixed inset-0 z-10 flex items-center justify-center shadow-lg" style={{ backgroundColor: '#000000c4' }}>
      <div className="p-6 rounded-lg shadow-xl w-full max-w-lg dark:bg-gray-dark">
        {/* Modal Content */}
        <div className="">
          {/* Image Preview */}
          <div className="w-full pb-4">
            <img
              src={image}
              alt="Preview"
              className="w-full h-[300px] object-cover"
            />
          </div>


          {/* Image Input */}
         {/* Image Upload Input */}
{/* Image Upload Input */}
<div className="mb-3">
  <label
    htmlFor="image-input"
    className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
  >
    Upload Image
  </label>
  <input
    id="image-input"
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="px-4 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
    style={{ borderRadius: '10px' }}
 />
</div>

{/* Room Name Input */}
<div className="mb-6">
  <label
    htmlFor="text-input"
    className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
  >
    Room Name
  </label>
  <input
  id="text-input"
  type="text"
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Enter room name"
  className="px-4 py-3 bg-white dark:bg-gray-700 text-black dark:text-white w-full text-sm border-b-2 border-gray-300 dark:border-gray-600 focus:border-[#007bff] outline-none"
  style={{ borderRadius: '10px' }}
/>

</div>



        </div>

        {/* Submit and Cancel Buttons */}
        <div className=" sm:flex sm:flex-row-reverse sm:gap-4 ">
          {!is_room_updated?.isLoading ? 
          
        
          <button
          onClick={() => setIsModalOpen(false)}
          className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Cancel
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
            onClick={handleSubmit}
            className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoomModal;
