import React from 'react'
import employeeImage from '../Images/login.webp'
import { useNavigate } from 'react-router-dom'

function Register() {

  const navigate = useNavigate();
  const redirect = () => {
    navigate('/login', { replace: true })
  }

  const handleRegister = () => {
    alert('register')
  }

  return (
    <section className="login md:flex md:flex-row-reverse md:gap-0 md:justify-center px-12">
      <div className="bg-white hidden md:flex md:justify-center md:items-center 
                      px-20 py-10 mt-10 md:rounded-r-lg">
        <img  src={employeeImage} 
              alt="Employee Clipart" 
              className="md:w-full lg:h-60 h-50 w-60"
        />
      </div>
    <div className="form bg-white px-20 py-9 mt-10 mx-auto md:mx-0 border-none md:rounded-l-lg flex flex-col gap-4 md:w-[450px]">
      <div className="text-center text-[#00101C]">
        <h1 className=" text-4xl font-bold">Welcome!</h1>
        <h4 className="text-sm italic mt-2">No account yet? Register now!</h4>
      </div>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label  htmlFor="userEmail" 
                  className="me-1 text-sm font-semibold text-[#297EA6]">
                    EMAIL
          </label>
          <input  name="userEmail" id="userEmail"
                  type="email"
                  placeholder="johnsmith@email.com"
                  className=" placeholder:italic placeholder:indent-2 
                              border outline-neutral-700 rounded-sm
                              text-sm indent-2 py-1 ps-5"
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
                  className=" placeholder:italic placeholder:indent-2 
                              border outline-neutral-700 rounded-sm
                              text-sm indent-2 py-1 ps-5"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label  htmlFor="confirmPassword" 
                  className="me-1 text-sm font-semibold text-[#297EA6]">
            CONFIRM PASSWORD
          </label>
          <input  name="confirmPassword" id="confirmPassword"
                  type="confirmPassword"
                  required
                  placeholder="••••••••••••••••"
                  className=" placeholder:italic placeholder:indent-2 
                              border outline-neutral-700 rounded-sm
                              text-sm indent-2 py-1 ps-5"
          />
        </div>
        <button   onClick={handleRegister}
                  className="bg-[#00101C] rounded-md py-2 mt-3
                              hover:scale-105 duration-150
                              text-white text-lg font-bold tracking-widest">
            Register
        </button>
      </form>
      <div className="flex justify-end gap-2 italic text-[#297EA6] text-xs">
        <p>Already have an account?</p>
        <button onClick={redirect} className='cursor-pointer'><u><i>Login here</i></u></button>
      </div>
    </div>
  </section>
  )
}

export default Register