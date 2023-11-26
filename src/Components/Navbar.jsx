import { Link } from 'react-router-dom'
import Search from "./Search"

function Navbar() {
  return (
    <nav className="sticky top-0 px-5 py-2 bg-[#00101C] shadow-lg flex items-center justify-between">
      <div className="font-bold text-xl md:text-2xl text-white">
        <Link to="/">LOGO</Link>
      </div>
      <div  title='Login' 
            className='text-white text-xs md-text-sm'>
        <Search />
      </div>
    </nav>
  )
}

export default Navbar