import { ArrowCircleRightIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="sticky top-0 px-5 py-2 bg-[#00101C] shadow-lg flex items-center justify-between">
      <div className="font-bold text-xl md:text-2xl text-white">
        <Link to="/">LOGO</Link>
      </div>
      <div title='Login'>
        <ArrowCircleRightIcon className='w-8 md:w-10 text-white border rounded-full border-border p-1 
                                        cursor-pointer hover:translate-x-2 duration-150'
                               />
      </div>
    </nav>
  )
}

export default Navbar