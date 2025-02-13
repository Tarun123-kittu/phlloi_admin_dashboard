import React from 'react'

const Events = () => {
    return (
        <div>
            <div className="rounded-[10px] bg-[#0E0E0E]">
                <div className="p-5 md:px-6 xl:px-9 border-b border-white">
                    <h4 className="text-body-2xlg font-bold text-white dark:text-white">
                        Events List
                    </h4>
                </div>
                <div className="grid grid-cols-7 border-b border-white p-4  sm:grid-cols-9 md:px-6 2xl:px-7.5">
                    <div className="col-span-3 flex items-center">
                        <p className="font-medium text-white">Event Name</p>
                    </div>
                    <div className="col-span-2 hidden items-start sm:flex">
                        <p className="font-medium text-white">Description</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium text-white">start At</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium text-white">End At</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium text-white">Created At</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium text-white"></p>
                    </div>
                </div>

              
                    <div
                        className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-9 md:px-6 2xl:px-7.5"
                        
                    >
                        <div className="col-span-3 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="h-12.5 w-15 rounded-md">
                             
                                </div>
                                <p className="text-body-sm font-medium text-white dark:text-dark-6">
                                    123
                                </p>
                            </div>
                        </div>
                        <div className="col-span-2 hidden items-center sm:flex">
                            <p className="text-body-sm font-medium text-white dark:text-dark-6">
                               123
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-body-sm font-medium text-white dark:text-dark-6">
                               123
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-body-sm font-medium text-white dark:text-dark-6">
                                123
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-body-sm font-medium text-green">
                                $123
                            </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                            <p className="text-body-sm font-medium text-green">
                                View
                            </p>
                        </div>
                    </div>
            
            </div>
        </div>
    )
}

export default Events