import SearchIcon from "../Images/SearchIcon.svg"
import { useState } from "react"

function Search() {


  const [ areSearching, setAreSearching ] = useState(false)
  const [ search, setSearch ] =  useState('')

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
        <div value={search} className="flex rounded-md">
          <input  type="search" 
                  name="search"
                  placeholder="Search"
                  onDoubleClick={handleSearchIcon}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="rounded-md indent-1 placeholder:italic p-1
                            text-gray-500 text-xs md:text-base"
          />
        </div>
      </div>
    </div>
  )
}

export default Search