import { UserIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="p-5 bg-white shadow-lg flex items-center justify-between">
      <div className="font-bold text-xl md:text-2xl text-[#297EA6]">
        <Link to="/">LOGO</Link>
      </div>
      <div>
        <UserIcon className='w-8 md:w-10 text-[#297EA6] border rounded-full border-[#297EA6] p-1 cursor-pointer' />
      </div>
    </nav>
  )
}

export default Navbar