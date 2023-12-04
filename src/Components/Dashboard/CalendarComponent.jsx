import { Calendar } from 'primereact/calendar'
import { useState } from 'react'

function CalendarComponent() {

    const [ date, setDate ] = useState(null)

  return (
    <>
      <h2 className="font-bold text-[#00101C] text-xl md:text-2xl mb-3 text-start">
        Calendar
      </h2>
      <hr/>
      <Calendar value={date} 
                onChange={(e) => setDate(e.value)} 
                inline 
                showWeek 
                className="mt-4 w-72"
      />
    </>
  )
}

export default CalendarComponent