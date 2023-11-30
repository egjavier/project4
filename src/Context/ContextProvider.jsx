import React, { useState } from 'react'
import Context from './Context'

function ContextProvider ({children}) {
  const [ search, setSearch ] = useState("")

  return (
    <Context.Provider value={{search, setSearch}}>
      {children}
    </Context.Provider>
  )

}

export default ContextProvider