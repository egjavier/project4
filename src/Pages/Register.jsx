import React from 'react'
import employeeImage from '../Images/login.webp'
import { useNavigate } from 'react-router-dom'
import { auth } from "../Components/FirebaseConfig"
import { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2'
import { useOutletContext } from 'react-router-dom'
import EmployeeList from './EmployeeList'
import { TextField } from '@mui/material'

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
    timer: 800,
    timerProgressBar: true,
  }) 

  const handleRegister = () => {
    if (email !== "" && password !== "" && confirmPassword !== '' && username !== "" && password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
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
    Toast.fire({
      icon: "warning",
      iconColor: "#297EA6",
      title: `Invalid or Missing credentials.`,
      color: "#297EA6",
    })  
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
                              <TextField  name="username" 
                                          id="username"
                                          type="text"
                                          label="Username"
                                          required
                                          variant='standard'
                                          placeholder="johndoe"
                                          onChange={e => setUsername(e.target.value)}
                                          value={username}
                                          className="indent-2"
                                          color='secondary'
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <TextField  name="userEmail" 
                                          id="userEmail"
                                          type="email"
                                          label="Email"
                                          required
                                          variant='standard'
                                          placeholder="johnsmith@email.com"
                                          onChange={e => setEmail(e.target.value)}
                                          value={email}
                                          className="indent-2"
                                          color='secondary'
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <TextField  name="password" 
                                          id="password"
                                          type="password"
                                          label="Password"
                                          required
                                          variant='standard'
                                          placeholder="••••••••••••••••"
                                          onChange={e => setPassword(e.target.value)}
                                          value={password}
                                          className="indent-2"
                                          color='secondary'
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <TextField  name="confirmPassword" 
                                          id="confirmPassword"
                                          type="password"
                                          label="Confirm Password"
                                          required
                                          variant='standard'                                          placeholder="••••••••••••••••"
                                          onChange={e => setConfirmPassword(e.target.value)}
                                          value={confirmPassword}
                                          className="indent-2"
                                          color='secondary'
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