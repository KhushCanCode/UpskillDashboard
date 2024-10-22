import React from 'react'

function LeagueCard({ leagueName, bgColor, imageSrc, xpRange }) {
    return (
      <div className={`flex items-center justify-between p-2 lg:p-3 rounded-xl border border-neutral-700`} style={{ backgroundColor: bgColor }}>

        {/* Image + Leauge name */}
        <div className='flex items-center gap-1 w-[40%] md:w-[60%]'>
          <img src={imageSrc} alt={leagueName} className='w-7 lg:w-10'/>
          <div>
            <p className='text-[10px] font-medium text-neutral-400 hidden md:block'>League</p>
            <h2 className='text-white text-[13px] lg:text-base font-semibold'>{leagueName}</h2>
          </div>
        </div>

        {/* XP + Gems */}
        <div className='flex flex-col items-center gap-1 '>
          <p className='text-xs lg:text-sm font-semibold text-secondary-800  '>{xpRange}</p>
          <div className='flex items-center gap-1 md:gap-2'>
            <img src="/assets/emerald.svg" alt="emerald" className='w-3 md:w-4'/>
            <p className='text-[11px] md:text-xs text-white font-semibold md:font-bold'>10 Gems</p>
          </div>
        </div>
      </div>
    );
  }
  

export default LeagueCard