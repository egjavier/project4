import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../Components/FirebaseConfig"
import { useState, useEffect} from "react"

function Layout() {

  const [ isloggedIn, setIsLoggedIn ] = useState(false)


  useEffect ( () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
        const uid = user.uid;
      } 
    });
  }, [])
  console.log(isloggedIn)

  return (
    <div className="relative bg-[url('./Images/background.svg')] bg-no-repeat min-h-screen min-w-screen bg-cover pb-[60px]"> 
      <Navbar isLoggedIn={isloggedIn} />
      <Outlet context={isloggedIn}/>
      <Footer />

    </div>
  )
}

export default Layout