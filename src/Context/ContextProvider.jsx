import React, { useState } from 'react'
import Context from './Context'

function ContextProvider ({children}) {
  const [ search, setSearch ] = useState("")
  const [ employeeInfo, setEmployeeInfo ] = useState({})

  return (
    <Context.Provider value={{
                              search, setSearch,
                              employeeInfo, setEmployeeInfo, 
                            }}>
      {children}
    </Context.Provider>
  )

}

export default ContextProvider