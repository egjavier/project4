import { useContext, useState } from "react"
import { useParams, useNavigate} from "react-router-dom"
import Context from "../Context/Context"
import { useEffect } from "react"
import github from "../Images/github.svg"
import linkedin from "../Images/linkedin.svg"
import DoughnutComponent from "../Components/Dashboard/DoughnutComponent"
import BarChartComponent from "../Components/Dashboard/BarChartComponent"
import LineChartComponent from "../Components/Dashboard/LineChartComponent"
import LeaveCredit from "../Components/Dashboard/LeaveCredit"
import AOS from 'aos';
import 'aos/dist/aos.css';
import profileImage from "../Images/profilePic.jpg"

function EmployeeCard() {

  AOS.init()

  const params = useParams()
  const employeeID = params.id.slice(1)
  const e = useContext(Context)
  localStorage.setItem("employee", JSON.stringify(e.employeeInfo))
  const employee = e.employeeInfo

  const navigate = useNavigate()

  const [ data, setData ] = useState("")

  useEffect(() => {
    employee.map(e => {
      e.id === employeeID && setData(e)
    })
  }, [])

  const back = () => {
    navigate('/', { replace: true })
  }

  return (
   <section className="mx-auto max-w-[1000px]">
    <div  onClick={back}
          className="fixed mx-8 my-3 rounded-full text-white bg-[#00101C]/80 h-10 w-10 pb-2 
                    font-black text-3xl hover:translate-x-[-10px] duration-150 cursor-pointer
                    flex justify-center items-center">
      ←
    </div>
    <div className="employeeCard bg-white m-5 p-2 rounded-md">
      {/* ROW 1 */}
      <div className="md:grid md:grid-cols-5">
        {/* EMPLOYEE INFO AND IMAGE */}
        <div className="md:col-span-3
                        border rounded-lg shadow-lg p-5 m-3
                        md:grid md:grid-cols-3 md:gap-1"
            data-aos="fade-up"
            data-aos-duration="1000">
          <div className="flex justify-center items-center md:col-span-1">
            <img  src={profileImage}
                  alt="Profile Picture"
                  className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-full 
                            text-center"
            />
          </div>
          <div className="md:col-span-2 my-2 text-center md:border-s md:ps-5
                          flex flex-col gap-2 md:items-start md:mx-5" >
            <p className="font-bold text-xl md:text-2xl text-[#00101C]">
              {data.firstname} {data.lastname}
            </p>
            <p className="font-bold text-[#297EA6] text-md md:text-lg md:indent-6">{data.jobTitle}</p>
            <p className="font-semibold italic text-[#297EA6] text-sm md:text-md md:indent-6 break-all">{data.email}</p>
            <p className="font-semibold italic text-[#297EA6] text-sm md:text-md md:indent-6">{data.phone}</p>
            <div className="p-1 flex justify-center items-center gap-2 md:ms-4">
              <img  src={github}
                    alt="Github"
                    title="Github"
                    className="w-8 h-8 md:h12 cursor-pointer"
              />
              <img  src={linkedin}
                    alt="LinkedIn"
                    title="LinkedIn"
                    className="w-8 h-8 md:h12 cursor-pointer"
              />
            </div>
          </div>
        </div>
        {/* EMPLOYEE BASIC INFO*/}
        <div  className="border rounded-lg shadow-lg p-5 m-3 md:col-span-2" 
              data-aos="fade-up"
              data-aos-duration="1000">
          <h2 className="font-bold text-[#00101C] text-xl md:text-2xl mb-3 text-center lg:text-start">
            Basic Information
          </h2>
          <hr />
          
          <div className="flex flex-col-reverse justify-center items-center
                          md:grid md:grid-cols-3 mt-5">
            <small className="m-1 md:p-0 md:col-span-1 text-center shadow-md shadow-black/60
                              px-2 md:px-0 bg-[#297EA6] rounded-md text-white">
              Employee ID
            </small>
            <p className="md:col-span-2 md:indent-2 md:text-center text-[#297EA6] italic text-sm break-all">
              {data.id}
            </p>
          </div>
          <div className="flex flex-col-reverse justify-center items-center
                          md:grid md:grid-cols-3">
            <small className="m-1 md:p-0 md:col-span-1 text-center  shadow-md shadow-black/60
                              px-2 md:px-0 bg-[#297EA6] rounded-md text-white">
              Date Hire
            </small>
            <p className="md:col-span-2 md:indent-2 md:text-center text-[#297EA6] italic text-sm">
              {data.hireDate}
            </p>
          </div>
          <div className="flex flex-col-reverse justify-center items-center 
                          md:grid md:grid-cols-3">
            <small className="m-1 md:p-0 md:col-span-1 text-center shadow-md shadow-black/60
                              px-2 md:px-0 bg-[#297EA6] rounded-md text-white">
              Status
            </small>
            <p className="md:col-span-2 md:indent-2 md:text-center text-[#297EA6] italic text-sm">
              {data.employmentStatus}
            </p>
          </div>
          <div className="flex flex-col-reverse justify-center items-center
                          md:grid md:grid-cols-3 mb-5">
            <small className="m-1 md:p-0 md:col-span-1 text-center shadow-md shadow-black/60
                              px-2 md:px-0 bg-[#297EA6] rounded-md text-white">
              Department
            </small>
            <p className="md:col-span-2 md:indent-2 md:text-center text-[#297EA6] italic text-sm">
              {data.department}
            </p>
          </div>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="lg:grid lg:grid-cols-2">
        {/*Pie and Line Chart  */}
        <div className="lg:col-span-1 lg:grid lg:gid-row-4"
              data-aos="fade-up"
              data-aos-duration="1000">
          <div className="border rounded-lg shadow-lg p-5 m-3
                          lg:row-span-2 text-center lg:text-start"
              data-aos="fade-up"
              data-aos-duration="1000">
            <DoughnutComponent />
          </div>
          <div className="border rounded-lg shadow-lg p-5 m-3
                          lg:row-span-2  text-center lg:text-start"
                data-aos="fade-up"
                data-aos-duration="1000">
            <LineChartComponent />
          </div>
        </div>
        {/*Leaves and Bar Chart */}
        <div className="lg:col-span-1 lg:grid lg:gid-row-4 lg:grid-cols-1"
              data-aos="fade-up"
              data-aos-duration="1000">
          <div className="border rounded-lg shadow-lg p-5 m-3
                          lg:row-span-1  text-center lg:text-start"
                data-aos="fade-up"
                data-aos-duration="1000">
            <LeaveCredit />
          </div>
          <div className="border rounded-lg shadow-lg p-5 m-3
                          lg:row-span-3  text-center lg:text-start"
              data-aos="fade-up"
              data-aos-duration="1000">
            <BarChartComponent />
          </div>
        </div>
          
      </div>
    </div>
  </section>
  )
}

export default EmployeeCard