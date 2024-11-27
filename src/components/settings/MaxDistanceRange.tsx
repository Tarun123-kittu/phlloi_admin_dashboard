import React from 'react'

const maxDistanceRange = () => {
    return (
        <div>
            <label htmlFor="max distance range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum Distance Range</label>
            <input  type="range" value="50" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

        </div>
    )
}

export default maxDistanceRange