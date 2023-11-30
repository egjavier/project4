import Context from "../Context/Context"
import SearchIcon from "../Images/SearchIcon.svg"
import { useState, useContext } from "react"

function Search() {

  
  const [ areSearching, setAreSearching ] = useState(false)
  const [ searchFilter, setSearchFilter ] =  useState('')
  
  const {setSearch} = useContext(Context)

  const handleSearchIcon = () => {
    setAreSearching(!areSearching)
  }
  
  return (
    <div className="flex items-center gap-2">
      <div className={ !areSearching ? "flex cursor-pointer" : "hidden cursor-pointer" }>
        <img  src={SearchIcon} alt="Search" title="Search"
              onClick={handleSearchIcon}
              className="h-6 p-1 bg-white rounded-full hover:scale-105 duration-150 "
        />
      </div>
      <div className={ !areSearching ? "hidden ounded-md" : "rounded-md" }>
        <div value={searchFilter} className="flex rounded-md">
          <input  type="search" 
                  name="search"
                  placeholder="Search"
                  onDoubleClick={handleSearchIcon}
                  value={searchFilter}
                  onChange={e => {
                    setSearchFilter(e.target.value.toLowerCase())
                    setSearch(e.target.value.toLowerCase())
                  }}
                  className="rounded-md indent-1 placeholder:italic p-1
                            text-gray-500 text-xs md:text-base"
          />
        </div>
      </div>
    </div>
  )
}

export default Search