import React from 'react'
import MaxDistanceRange from "./MaxDistanceRange"
import Rooms from "./Rooms"

const Settings = () => {
    return (
        <div>
            <div className='p-4 border shadow-sm bg-white rounded-2xl dark:bg-gray-dark dark:border-gray-500 '>
                <MaxDistanceRange />
            </div>
            <div className='p-4 border shadow-sm bg-white rounded-2xl dark:bg-gray-dark dark:border-gray-500 mt-4'>
                <Rooms />
            </div>
        </div >
    )
}

export default Settings