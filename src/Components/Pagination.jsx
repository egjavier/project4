import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'

function Pagination({employee, usersPerPage, setCurrentPage, currentPage}) {

  // automatically scoll ontop after page change
  useEffect( () => {
    window.scrollTo({top: 0})
  }, [currentPage])

  return (
    <>
    {console.log(usersPerPage)}
      <ReactPaginate
        className='pagination text-[#297EA6] flex gap-5 justify-center items-center
                    max-w-[1000px] mx-auto w-4/5 mt-5 border rounded-md bg-white'
      // name of the buttons
        previousLabel={'Prev'}
        nextLabel={'Next'}
        breakLabel={"..."}
      // number of pages
      // Math.ceil to roundup the number and divide it by the number of usersPerPage
        pageCount={(Math.ceil(employee.length)) / 10}
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