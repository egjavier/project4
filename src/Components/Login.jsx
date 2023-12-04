import employeeImage from '../Images/login.webp'
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./FirebaseConfig"
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useOutletContext } from 'react-router-dom'
import EmployeeList from './EmployeeList'

function Login() {

  const isLoggedIn = useOutletContext()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const navigate = useNavigate();
  const redirect = () => {
    navigate('/register', { replace: true })
  }

    
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

  const handleLogin = () => {
    if (email !== "" && password !== "") {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // USER INFO
            const user = userCredential.user;

            setEmail('')
            setPassword('')
            
            console.log('logged in')

            // REDIRECT TO EMPLOYEELIST PAGE ONE LOGGED IN
            navigate(("/employeelist"), {replace: true})
          })
          .catch((error) => {
            Toast.fire({
              icon: "warning",
              iconColor: "#297EA6",
              title: `Invalid or Missing credentials.`,
              color: "#297EA6",
            }) 
            console.error(error)
            const errorCode = error.errorCode
            const errorMessage = error.message
          });

    } else {
      Toast.fire({
        icon: "warning",
        iconColor: "#297EA6",
        title: `Invalid or Missing credentials.`,
        color: "#297EA6",
      }) 
    }
  } 

  return (
    <section className="login md:flex md:gap-0 md:justify-center px-12">
      {
        !isLoggedIn ?
                      <>
                        <div className="bg-white hidden md:flex md:justify-center md:items-center 
                                        px-20 py-10 mt-10 md:rounded-l-lg">
                          <img  src={employeeImage} 
                                alt="Employee Clipart" 
                                className="h-60 w-60"
                          />
                        </div>
                        <div className="form bg-white px-10 py-10 mt-10 mx-auto md:mx-0 border-none md:rounded-r-lg flex flex-col gap-9">
                          <div className="text-center text-[#00101C]">
                            <h1 className=" text-4xl font-bold">Welcome back!</h1>
                            <h4 className="text-sm italic mt-2">Please login to your account.</h4>
                          </div>
                          <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                              <label  htmlFor="userEmail" 
                                      className="me-1 text-sm font-semibold text-[#297EA6]">
                                        EMAIL
                              </label>
                              <input  name="userEmail" id="userEmail"
                                      type="email"
                                      placeholder="johnsmith@email.com"
                                      onChange={(e) => setEmail(e.target.value)}
                                      value={email}
                                      className=" placeholder:italic placeholder:indent-2 
                                                  border outline-neutral-700 rounded-sm
                                                  text-base indent-2 py-1 ps-1"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label  htmlFor="password" 
                                      className="me-1 text-sm font-semibold text-[#297EA6]">
                                PASSWORD
                              </label>
                              <input  name="password" id="password"
                                      type="password"
                                      required
                                      placeholder="••••••••••••••••"
                                      onChange={(e) => setPassword(e.target.value)}
                                      value={password}
                                      className=" placeholder:italic placeholder:indent-2 
                                                  border outline-neutral-700 rounded-sm
                                                  text-base indent-2 py-1 ps-1"
                              />
                            </div>
                            <button   onClick={handleLogin}
                                      className="bg-[#00101C] rounded-md py-2 mt-3
                                                  hover:scale-105 duration-150
                                                  text-white text-lg font-bold tracking-[0.6rem] ">
                                Login
                            </button>
                          </div>
                          <div className="flex justify-end gap-2 italic text-[#297EA6] text-xs">
                            <p>New user?</p>
                            <button onClick={redirect} className='cursor-pointer'><u><i>Register here</i></u></button>
                          </div>
                        </div>
                      </> 
                    : <EmployeeList />
      }
    </section>
  )
}

export default Login