import { signOut } from "firebase/auth";
import { auth } from "../Components/FirebaseConfig"
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

function Logout() {

  const isLoggedIn = useOutletContext()
  const [ authenticated , setAuthenticated ] = useState(isLoggedIn)
  const navigate = useNavigate()
 
  const handleLogout = () => {
    signOut(auth).then(() => {
      setAuthenticated(false)
      navigate('/', { replace: true })
      //RELOAD PAGE AFTER LOGGING OUT
      window.location.reload()
    }).catch((error) => {
      console.error(error)
    });
  }  
    

  return (
    <button onClick={handleLogout} 
            className="flex justify-center items-center text-[#00101C] bg-white text-xs md:text-sm
                      hover:scale-105 duration-150 cursor-pointer p-1 rounded font-bold">
      Logout
    </button>
  )
}

export default Logout