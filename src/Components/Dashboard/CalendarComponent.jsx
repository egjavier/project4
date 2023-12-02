import { Calendar } from 'primereact/calendar'
import { useState } from 'react'

function CalendarComponent() {

    const [ date, setDate ] = useState(null)

  return (
    <>
      <h2 className="font-bold text-[#00101C] text-xl md:text-2xl mb-3">
        Calendar
      </h2>
      <hr/>
      <Calendar value={date} 
                onChange={(e) => setDate(e.value)} 
                inline 
                showWeek 
                className="mt-4"
      />
    </>
  )
}

export default CalendarComponent