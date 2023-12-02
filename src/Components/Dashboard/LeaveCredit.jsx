import React from 'react'

function LeaveCredit() {
  return (
    <div>
      <h2 className="font-bold text-[#00101C] text-xl md:text-2xl mb-3">
        Leave Credits
      </h2>
      <hr/>
      
      <div className='flex justify-center items-center gap-5 mt-4'>
        {/* VACATION */}
        <div>
          <p className='text-white bg-[#297EA6] rounded-full w-16 h-16
                        flex justify-center items-center text-2xl font-bold tracking-wider'>
            40
          </p>
          <small className='text-[#297EA6] font-semibold flex text-center'>
            Vacation <br/> Leave
          </small>
        </div>
        {/* SICK */}
        <div>
          <p className='text-white bg-[#297EA6] rounded-full w-16 h-16
                        flex justify-center items-center text-2xl font-bold tracking-wider'>
            15
          </p>
          <small className='text-[#297EA6] font-semibold flex justify-center text-center'>
            Sick <br/> Leave
          </small>
        </div>
      </div>

    </div>
  )
}

export default LeaveCredit