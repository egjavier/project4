import React from 'react'
import employeeImage from '../Images/login.webp'
import { useNavigate } from 'react-router-dom'
import { auth } from "../Components/FirebaseConfig"
import { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2'
import { useOutletContext } from 'react-router-dom'
import EmployeeList from '../Components/EmployeeList'

function Register() {

  const isLoggedIn = useOutletContext()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] =  useState('')
  const [ username, setUsername ] = useState('')

  const navigate = useNavigate();
  const redirect = () => {
    navigate('/', { replace: true })
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

  const handleRegister = () => {
    if (email !== "" && password !== "" && confirmPassword !== '' && username !== "" && password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          Toast.fire({
            icon: "success",
            iconColor: "#297EA6",
            title: `Registration successful!`,
            color: "#297EA6",
          }) 
          
          
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setUsername('')

          navigate('/employeelist', { replace: true })
        })
        .catch((error) => {
          Toast.fire({
            icon: "warning",
            iconColor: "#297EA6",
            title: `Invalid or Missing credentials.`,
            color: "#297EA6",
          }) 
          const errorCode = error.errorCode
          const errorMessage = error.message
        });

  } else {
    alert("Incorrect or missing credential")
  }
}

  return (
    <section className="login md:flex md:flex-row-reverse md:gap-0 md:justify-center px-12">
      {
        !isLoggedIn ?
                      <>
                        <div className="bg-white hidden md:flex md:justify-center md:items-center 
                                        px-10 py-10 mt-10 md:rounded-r-lg">
                          <img  src={employeeImage} 
                                alt="Employee Clipart" 
                                className="h-60 w-60"
                          />
                        </div>
                        <div className="form bg-white px-10 py-9 mt-10 mx-auto md:mx-0 border-none md:rounded-l-lg flex flex-col gap-4 md:w-[450px]">
                          <div className="text-center text-[#00101C]">
                            <h1 className=" text-4xl font-bold">Welcome!</h1>
                            <h4 className="text-sm italic mt-2">No account yet? Register now!</h4>
                          </div>
                          <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                            <label  htmlFor="username" 
                                      className="me-1 text-sm font-semibold text-[#297EA6]">
                                        USERNAME
                              </label>
                              <input  name="username" id="username"
                                      type="text"
                                      placeholder="johndoe"
                                      onChange={e => setUsername(e.target.value)}
                                      value={username}
                                      className=" placeholder:italic placeholder:indent-2 
                                                  border outline-neutral-700 rounded-sm
                                                  text-sm indent-2 py-1 ps-1"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label  htmlFor="userEmail" 
                                      className="me-1 text-sm font-semibold text-[#297EA6]">
                                        EMAIL
                              </label>
                              <input  name="userEmail" id="userEmail"
                                      type="email"
                                      placeholder="johnsmith@email.com"
                                      onChange={e => setEmail(e.target.value)}
                                      value={email}
                                      className=" placeholder:italic placeholder:indent-2 
                                                  border outline-neutral-700 rounded-sm
                                                  text-sm indent-2 py-1 ps-1"
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
                                      onChange={e => setPassword(e.target.value)}
                                      value={password}
                                      className=" placeholder:italic placeholder:indent-2 
                                                  border outline-neutral-700 rounded-sm
                                                  text-sm indent-2 py-1 ps-1"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label  htmlFor="confirmPassword" 
                                      className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">
                                CONFIRM PASSWORD
                              </label>
                              <input  name="confirmPassword" id="confirmPassword"
                                      type="password"
                                      required
                                      placeholder="••••••••••••••••"
                                      onChange={e => setConfirmPassword(e.target.value)}
                                      value={confirmPassword}
                                      className=" placeholder:italic placeholder:indent-2 
                                                  border outline-neutral-700 rounded-sm
                                                  text-sm  indent-2 py-1 ps-1"
                              />
                            </div>
                            <button   onClick={handleRegister}
                                      className="bg-[#00101C] rounded-md py-2 mt-3
                                                  hover:scale-105 duration-150
                                                  text-white text-lg font-bold tracking-widest">
                                Register
                            </button>
                          </div>
                          <div className="flex items-end flex-col gap-2 italic text-[#297EA6] text-xs">
                            <p>Already have an account?</p>
                            <button onClick={redirect} className='cursor-pointer'><u><i>Login here</i></u></button>
                          </div>
                        </div>
                      </>
                    : <EmployeeList />
      }
  </section>
  )
}

export default Register