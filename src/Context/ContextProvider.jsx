import React, { useState } from 'react'
import Context from './Context'

function ContextProvider ({children}) {

  const inititalState = () => {
    const emp = localStorage.getItem("employee")
    return emp ? JSON.parse(emp) : ""
  }

  const [ search, setSearch ] = useState("")
  const [ employeeInfo, setEmployeeInfo ] = useState(inititalState)
  const [ imgLink, setImgLink ] = useState("")

  return (
    <Context.Provider value={{
                              search, setSearch,
                              employeeInfo, setEmployeeInfo, 
                              imgLink, setImgLink
                            }}>
      {children}
    </Context.Provider>
  )

}

export default ContextProvider