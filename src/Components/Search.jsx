import { SortDescendingIcon, FilterIcon, SearchIcon } from "@heroicons/react/solid"

function Search() {
  return (
    <div className='flex items-center justify-between 
                    max-w-[1000px] mx-auto bg-[#297EA6]/60 
                    py-2 px-3 md:my-5 rounded-md shadow-tremor-card'>
      <div className="">
        <div className="flex rounded-s-md">
          <input  type="search" 
                  name="search"
                  placeholder="Search"
                  className="rounded-s-md indent-1 placeholder:italic p-1
                            text-gray-500 text-sm md:text-base"
          />
          <button className="rounded-e-md bg-white text-[#297EA6] border-s border-[#297EA6]  hover:bg-blue-100">
          <SearchIcon className="h-5 px-1"/>
          </button>
        </div>
      </div>
      <div className="flex cursor-pointer">
        <p className="me-1" title="Sort">
          <SortDescendingIcon className="w-5 hover:text-blue-100" />
        </p>
        <p title="Filter">
          <FilterIcon className="w-5 hover:text-blue-100" />
        </p>
      </div>
    </div>
  )
}

export default Search