import employeeImage from '../Images/login.webp'
import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate();
  const redirect = () => {
    navigate('/register', { replace: true })
  }

  const handleLogin = () => {
    alert('Login')
  }

  return (
    <section className="login md:flex md:gap-0 md:justify-center px-12">
      <div className="bg-white hidden md:flex md:justify-center md:items-center 
                      px-20 py-10 mt-10 md:rounded-l-lg">
        <img  src={employeeImage} 
              alt="Employee Clipart" 
              className="md:w-full lg:h-60 h-50 w-60"
        />
      </div>
      <div className="form bg-white px-20 py-10 mt-10 mx-auto md:mx-0 border-none md:rounded-r-lg flex flex-col gap-9">
        <div className="text-center text-[#00101C]">
          <h1 className=" text-4xl font-bold">Welcome back!</h1>
          <h4 className="text-sm italic mt-2">Please login to your account.</h4>
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
                                text-base indent-2 py-2 ps-5"
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
                                text-base indent-2 py-2 ps-5"
            />
          </div>
          <button   onClick={handleLogin}
                    className="bg-[#00101C] rounded-md py-2 mt-3
                                hover:scale-105 duration-150
                                text-white text-lg font-bold tracking-[0.6rem] ">
              Login
          </button>
        </form>
        <div className="flex justify-end gap-2 italic text-[#297EA6] text-xs">
          <p>New user?</p>
          <button onClick={redirect} className='cursor-pointer'><u><i>Register here</i></u></button>
        </div>
      </div>
    </section>
  )
}

export default Login