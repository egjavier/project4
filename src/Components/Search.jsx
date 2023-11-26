import FunnelIcon from "../Images/FunnelIcon.svg"
import SearchIcon from "../Images/SearchIcon.svg"
import { useState } from "react"

function Search() {

  const [ areSearching, setAreSearching ] = useState(false)

  const handleSearchIcon = () => {
    setAreSearching(!areSearching)
  }

  return (
    <div className="flex items-center gap-2">
      <div className={ !areSearching ? "flex cursor-pointer" : "hidden cursor-pointer" }>
        <img  src={SearchIcon} alt="Search" title="Search"
              onClick={handleSearchIcon}
              className="h-5 p-1 bg-white rounded-full hover:scale-105 duration-150 "
        />
      </div>
      <div className={ !areSearching ? "hidden ounded-md" : "rounded-md" }>
        <div className="flex rounded-s-md">
          <input  type="search" 
                  name="search"
                  placeholder="Search"
                  className="rounded-s-md indent-1 placeholder:italic p-1
                            text-gray-500 text-xs md:text-base"
          />
          <button onDoubleClick={handleSearchIcon}
                  className="rounded-e-md text-white bg-[#00101C] font-bold hover:text-[#00101C] hover:bg-[white] duration-150 px-3">
          Search
          </button>
        </div>
      </div>
      <div className="flex cursor-pointer">
        <img  src={FunnelIcon} alt="Filter" title="Filter"
              className="h-5 p-1 bg-white rounded-full hover:scale-105 duration-150 "
        />
      </div>
    </div>
  )
}

export default Search