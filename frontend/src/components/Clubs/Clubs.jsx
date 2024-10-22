import React from 'react'
import ClubCard from './ClubCard'

function Clubs() {
  return (
    <div className="h-[100%] w-[100%] bg-neutral-900 p-4 lg:p-6 md:pt-3">

      <div className="gradient-border w-fit">
        <div className='dark-bg w-fit'>
          <div className="gradient-border-content p-3 flex flex-col md:flex-row md:items-center text-white text-sm gap-4 w-fit">
            <div className="flex items-center gap-1">
              <img src="/assets/emerald.svg" alt="" />
              <p className="font-bold whitespace-nowrap ">x 5</p>
            </div>
            <p className="font-medium lg:whitespace-nowrap">Earn 5 Gems by attending club sessions for 1 week consistently. (Applicable for all the clubs)</p>
          </div>
        </div>
      </div>

      {/* Club Cards */}
      <div className='mt-5 lg:mt-10 h-[65%] lg:h-[50%] flex flex-col md:flex-row items-center gap-5 overflow-y-scroll lg:overflow-hidden'>
      <ClubCard 
        image="/assets/devclub.svg" 
        name="Developer Club" 
        description="Logic building and algorithm building"
        timings="10PM to 11PM"
        members="+30 More"
      />
         <ClubCard 
        image="/assets/speakup.svg" 
        name="SpeakUp Club" 
        description="Public speaking and presentation skills"
        timings="8PM to 9PM"
        members="+15 More"
      />
          <ClubCard 
        image="/assets/dsa.svg" 
        name="DSA Club" 
        description="Data structures and algorithms mastery"
        timings="9PM to 10PM"
        members="+25 More"
      />
      </div>
      

    </div>
  )
}

export default Clubs