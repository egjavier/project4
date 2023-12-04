import { Link } from 'react-router-dom'
import Search from "./Search"
import Logout from './Logout'

function Navbar({isLoggedIn}) {

  return (
    <nav className="sticky top-0 px-5 py-2 bg-[#00101C] shadow-lg flex items-center justify-between z-10">
      <div className="font-bold text-xl md:text-2xl text-white">
        <Link to={isLoggedIn ? "employeelist" : "/"}>
          {
            !isLoggedIn ? 'LOGO' : 'HOME'
          }
        </Link>
      </div>
      <div className='text-white text-xs md-text-sm flex gap-2'>
        { isLoggedIn ?  <>
                          <Search />
                          <Logout />
                        </> 
                      : ''
        }
      </div>
    </nav>
  )
}

export default Navbar