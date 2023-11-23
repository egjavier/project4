import React from 'react'

function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-[300px] '>
      <h1 className='text-white font-black text-xl md:text-2xl'>ERROR 404</h1>
      <h2 className='text-white italic text-sm md:text-lg'>Page not Found!</h2>
    </div>
  )
}

export default NotFound