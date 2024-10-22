import React from 'react'

function Navbar() {
  return (
    <div className='bg-neutral-1200 h-16 flex items-center justify-between px-5 '>

      {/* Username */}
        <h3 className='text-base lg:text-lg font-semibold text-white ml-8 md:ml-0  '>Salman</h3>

      {/* League + XP   */}
        <div className='flex items-center  bg-[#ffffff12] rounded-md p-2 gap-2 absolute right-4 md:static'>
            <img src="/assets/bronze.svg" alt="" className='w-6'/>
            <p className='font-["Montserrat Alternates"] text-sm font-semibold text-white  w-full hidden lg:flex'>Bronze I</p>
            <img src="/assets/dot.svg" alt="" />
            <p className='text-sm font-semibold text-secondary-700 w-full md:w-[70%]'>48 XP</p>
        </div>
    </div>
  )
}

export default Navbar