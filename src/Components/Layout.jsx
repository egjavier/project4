import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout() {
  return (
    <div className="relative bg-[url('./Images/background.svg')] bg-no-repeat min-h-screen min-w-screen bg-cover pb-[60px]"> 
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  )
}

export default Layout