import Context from "../Context/Context"
import { useState, useContext } from "react"
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

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
        <div  title="Search"
              onClick={handleSearchIcon}
              className="hover:scale-110 duration-150"
        >
          <PersonSearchIcon fontSize="medium"/>
        </div>
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
                            text-gray-500 text-xs md:text-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default Search