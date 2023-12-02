import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import Context from "../Context/Context"
import { useEffect } from "react"
import imagePlaceholder from "../Images/profilePic.jpg"
import github from "../Images/github.svg"
import linkedin from "../Images/linkedin.svg"
import DoughnutComponent from "./Dashboard/DoughnutComponent"
import CalendarComponent from "./Dashboard/CalendarComponent"
import LineChart from "./Dashboard/LineChart"

function EmployeeCard() {

  const params = useParams()
  const employeeID = params.id.slice(1)
  const e = useContext(Context)
  const employee = e.employeeInfo

  console.log(employee)
  const [ data, setData ] = useState('')

  useEffect(() => {
    employee.map(e => {
      e.id === employeeID && setData(e)
    })
  }, [])

  return (
   <section className="mx-auto max-w-[1000px]">
    <div className="employeeCard bg-white m-5 p-2 rounded-md">
      {/* ROW 1 */}
      <div className="md:grid md:grid-cols-5">
        {/* EMPLOYEE INFO AND IMAGE */}
        <div className="md:col-span-3
                        border rounded-lg shadow-lg p-5 m-3
                        md:grid md:grid-cols-3 md:gap-1">
          <div className="flex justify-center items-center md:col-span-1">
            <img  src={imagePlaceholder}
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
            <p className="font-semibold italic text-[#297EA6] text-sm md:text-md md:indent-6">{data.email}</p>
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
        <div className="border rounded-lg shadow-lg p-5 m-3 md:col-span-2">
          <h2 className="font-bold text-[#00101C] text-xl md:text-2xl mb-3">
            Basic Information
          </h2>
          <hr />
          
          <div className="flex flex-col-reverse justify-center items-center
                          md:grid md:grid-cols-3 mt-5">
            <small className="m-1 md:p-0 md:col-span-1 text-center
                              px-2 md:px-0 bg-[#297EA6] rounded-md text-white">
              Employee ID
            </small>
            <p className="md:col-span-2 md:indent-2 md:text-center text-[#297EA6] italic text-sm">
              {data.id}
            </p>
          </div>
          <div className="flex flex-col-reverse justify-center items-center
                          md:grid md:grid-cols-3">
            <small className="m-1 md:p-0 md:col-span-1 text-center 
                              px-2 md:px-0 bg-[#297EA6] rounded-md text-white">
              Date Hire
            </small>
            <p className="md:col-span-2 md:indent-2 md:text-center text-[#297EA6] italic text-sm">
              {data.hireDate}
            </p>
          </div>
          <div className="flex flex-col-reverse justify-center items-center
                          md:grid md:grid-cols-3">
            <small className="m-1 md:p-0 md:col-span-1 text-center 
                              px-2 md:px-0 bg-[#297EA6] rounded-md text-white">
              Status
            </small>
            <p className="md:col-span-2 md:indent-2 md:text-center text-[#297EA6] italic text-sm">
              {data.employmentStatus}
            </p>
          </div>
          <div className="flex flex-col-reverse justify-center items-center
                          md:grid md:grid-cols-3 mb-5">
            <small className="m-1 md:p-0 md:col-span-1 text-center 
                              px-2 md:px-0 bg-[#297EA6] rounded-md text-white">
              Department
            </small>
            <p className="md:col-span-2 md:indent-2 md:text-center text-[#297EA6] italic text-sm">
              {data.department}
            </p>
          </div>

          {/* <hr />
          <div className="my-5 flex justify-center items-center gap-4">
            <div className="flex flex-col-reverse justify-center items-center ">
              <small className="text-[#00101C] text-center font-semibold mt-2">
                Vacation <br /> Leave
              </small>
              <p className="bg-[#297EA6] text-white w-14 h-14 rounded-full text-2xl font-black
                            flex justify-center items-center tracking-wide">
                40
              </p>
            </div>
            <div className="flex flex-col-reverse justify-center items-center">
              <small className="text-[#00101C] text-center font-semibold mt-2">
                Sick <br/> Leave
              </small>
              <p className="bg-[#297EA6] text-white w-14 h-14 rounded-full text-2xl font-black
                            flex justify-center items-center tracking-wide">
                20
              </p>
            </div>
          </div> */}
        </div>
      </div>

      {/* ROW 2 */}
      <div className="md:grid md:grid-cols-2">
          <div className="md:col-span-1">
            <div className="md:grid">
              <div className="flex flex-col justify-center md:text-start
                              border rounded-lg shadow-lg p-5 m-3">
                <CalendarComponent />
              </div>
              <div className="
                              border rounded-lg shadow-lg p-5 m-3">
                <DoughnutComponent />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1 md:grid md:grid-rows-3">
              <div className="md:row-span-1 border rounded-lg shadow-lg p-5 m-3">
                <h2 className="font-bold text-[#00101C] text-xl md:text-2xl mb-3">
                  Leave Credits
                </h2>
                <hr/>
                <div className="flex justify-center items-center gap-10 mt-4">
                  <div className="flex flex-col-reverse justify-center items-center ">
                    <small className="text-[#00101C] text-center font-semibold mt-2">
                      Vacation Leave
                    </small>
                    <p className="bg-[#297EA6] text-white w-14 h-14 rounded-full text-2xl font-black
                                  flex justify-center items-center tracking-wide">
                      40
                    </p>
                  </div>
                  <div className="flex flex-col-reverse justify-center items-center">
                    <small className="text-[#00101C] text-center font-semibold mt-2">
                      Sick Leave
                    </small>
                    <p className="bg-[#297EA6] text-white w-14 h-14 rounded-full text-2xl font-black
                                  flex justify-center items-center tracking-wide">
                      20
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-[#00101C] md:row-span-2
                              border rounded-lg shadow-lg p-5 m-3">
                <LineChart />
              </div>
            </div>


      </div>
    </div>
  </section>
  )
}

export default EmployeeCard