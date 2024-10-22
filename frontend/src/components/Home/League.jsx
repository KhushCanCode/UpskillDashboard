import React from 'react'
import LeagueCard from './LeagueCard'

function League() {
  return (
    <div className='static md:absolute right-4 p-3 lg:p-5 rounded-lg md:w-[40%] lg:w-[30%] bg-[#131612] flex flex-col gap-4'>

      {/* Leagues + cross icon */}
        <div className=' flex items-center justify-between '>
            <p className='text-white text-base lg:text-lg font-semibold'>Leagues</p>
            <img src="/assets/cross.svg" alt="cross" className='w-5 lg:w-7' />
        </div>

      {/* Gradient Border + earn 10 gems */}
        <div className="gradient-border w-fit">
        <div className='dark-bg w-fit'>
          <div className="gradient-border-content p-2 flex items-center text-white text-xs gap-3 w-fit">
            <div className="flex items-center gap-1">
              <img src="/assets/emerald.svg" alt="" />
              <p className="font-bold ">x 10</p>
            </div>
            <p className="font-medium ">Earn 10 Gems</p>
          </div>
        </div>
      </div>

    {/* League cards */}
      <div className='flex flex-col gap-2'>
      <LeagueCard 
        leagueName="Bronze League" 
        bgColor="#FFCF330D" 
        imageSrc="/assets/bronze.svg" 
        xpRange="0XP to 100XP" 
        />
        <LeagueCard 
        leagueName="Silver League" 
        bgColor="#52AAFD0D" 
        imageSrc="/assets/silver.svg" 
        xpRange="100XP to 200XP" 
        />
        <LeagueCard 
        leagueName="Gold League" 
        bgColor="#D73B430D" 
        imageSrc="/assets/gold.svg" 
        xpRange="200XP to 300XP" 
        />
        <LeagueCard 
        leagueName="Diamond League" 
        bgColor="#B67DFF0D" 
        imageSrc="/assets/diamond.svg" 
        xpRange="300XP to 400XP" 
        />
        <LeagueCard 
        leagueName="Emerald League" 
        bgColor="#50DD890D" 
        imageSrc="/assets/emerald2.svg" 
        xpRange="400XP to 500XP" 
        />
        

      </div>

    </div>
  )
}

export default League