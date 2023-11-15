import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout() {
  return (
    <div className="bg-[url('./Images/background.svg')] bg-no-repeat bg-fixed min-h-screen min-w-screen bg-cover"> 
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout