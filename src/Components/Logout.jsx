import LogoutIcon from "../Images/logoutIcon.svg"
import { signOut } from "firebase/auth";
import { auth } from "../Components/FirebaseConfig"
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2'

function Logout() {

  const isLoggedIn = useOutletContext()
  const [ authenticated , setAuthenticated ] = useState(isLoggedIn)
  const navigate = useNavigate()

    //MODAL
    const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1300,
    timerProgressBar: true,
  }) 
 
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
    <div  onClick={handleLogout} 
          className="flex justify-center items-center text-[#00101C] bg-white 
                    hover:scale-105 duration-150 cursor-pointer p-1 rounded font-bold">
      Logout
    </div>
  )
}

export default Logout