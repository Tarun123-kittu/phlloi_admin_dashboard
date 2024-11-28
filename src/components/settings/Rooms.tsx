import React from 'react'
import RoomsCard from "./RoomsCard"

const Rooms = () => {
  return (
    <div>
        <div className='mb-2'>
            <h1 className='font-bold text-2xl'>Rooms List</h1>
        </div>
        <RoomsCard />
    </div>
  )
}

export default Rooms