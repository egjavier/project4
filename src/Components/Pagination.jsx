import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'

function Pagination({employee, usersPerPage, setCurrentPage, currentPage}) {

  // automatically scoll ontop after page change
  useEffect( () => {
    window.scrollTo({top: 0})
  }, [currentPage])

  return (
    <>
      <ReactPaginate
        className="pagination text-[#297EA6] flex gap-5 justify-center items-center w-full
                  max-w-[1200px] mt-5 border rounded bg-white text-xs md:text-sm p-1"
      // name of the buttons
        previousLabel={'Prev'}
        nextLabel={'Next'}
        breakLabel={"..."}
      // number of pages
      // Math.ceil to roundup the number and divide it by the number of usersPerPage
        pageCount={Math.ceil(employee.length / 10)}
      // ReactPaginate have {selected}, it basically make the pagination work
        onPageChange={({selected}) => { setCurrentPage(selected)}}
        activeClassName={'currentPage'}
        previousLinkClassName={"prevBtn"}
        nextLinkClassName={"nextBtn"}
      />
    </>
  )
}

export default Pagination