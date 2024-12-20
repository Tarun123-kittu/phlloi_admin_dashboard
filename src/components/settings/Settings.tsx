import React from 'react'
import MaxDistanceRange from "./MaxDistanceRange"
import Rooms from "./Rooms"

const Settings = () => {
    return (
        <div>
            <div className='p-4  shadow-sm bg-cardBg rounded-2xl dark:bg-gray-dark '>
                <MaxDistanceRange />
            </div>
            <div className='p-4  shadow-sm bg-cardBg rounded-2xl dark:bg-gray-dark dark:border-gray-500 mt-4'>
                <Rooms />
            </div>
        </div >
    )
}

export default Settings