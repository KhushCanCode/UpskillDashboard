import React from 'react'

const ClubCard = ({ image, name, description, timings, members }) => {
  return (
    <div className='bg-neutral-1200 w-[268px] h-[320px] rounded-xl'>
      {/* Image */}
      <div>
        <img src={image} alt={name} className='rounded-t-xl' />
      </div>

      {/* Name + Description */}
      <div className='flex items-center gap-2 px-3 py-4 border-b border-neutral-700'>
        <div className='bg-neutral-500 h-10 w-10 rounded-md'></div>
        <div>
          <h3 className='text-white text-sm font-semibold'>{name}</h3>
          <p className='truncate max-w-[190px] text-xs font-medium text-neutral-400'>{description}</p>
        </div>
      </div>

      {/* Timing */}
      <div className='flex items-center justify-between px-3 py-4 border-b border-neutral-700'>
        <div className='flex items-center gap-1'>
          <img src="/assets/clock.svg" alt="clock" />
          <p className='text-white text-xs font-semibold'>Open Timings</p>
        </div>
        <div>
          <p className='text-white text-xs font-semibold'>{timings}</p>
        </div>
      </div>

      {/* Member Details */}
      <div className='flex items-center justify-between px-3 py-4'>
        <div className='flex items-center gap-1'>
          <img src="/assets/members.svg" alt="members" />
          <p className='text-secondary-500 text-xs font-semibold'>{members}</p>
        </div>
        <div className='p-2 bg-gradient-to-r from-primary-700 to-secondary-700 rounded-xl'>
          <p className='text-xs font-semibold text-gray-900'>View Details</p>
        </div>
      </div>
    </div>
  );
};

export default ClubCard