import AddEmployee from "./AddEmployee"
import db from "../Components/FirebaseConfig"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { useEffect, useState, useContext } from "react"
import Swal from 'sweetalert2';
import EditEmployee from "./EditEmployee"
import Pagination from "../Components/Pagination"
import Login from "./Login"
import { useOutletContext, useNavigate } from "react-router-dom"
import Context from "../Context/Context";
import profileImage from "../Images/profilePic.jpg"

function EmployeeList() {
  const {search} = useContext(Context)
  const {setEmployeeInfo} = useContext(Context)

  const [ isSortingName, setIsSortingName ] = useState(false)
  const [ isSortingJob, setIsSortingJob ] = useState(false)
  const [ isSortingDepartment, setIsSortingDepartment ] = useState(false)
  const [ isSortingStatus, setIsSortingStatus ] = useState(false)

  const [ employee, setEmployee ] = useState([])

  const [ isUpdating, setIsUpdating ] = useState(false)
  const [ isEmployee, setIsEmployee ] = useState({})  

  const [ currentPage, setCurrentPage ] = useState(0)
  const [ usersPerPage, setUsersPerPage] = useState(10)
  const numbersOfUsersSeen = currentPage * usersPerPage

  //PASS ALL OUTLET PROPS TO ALL CHILDREN
  const isLoggedIn = useOutletContext() 

  // READ DATA FROM FIREBASE
  const readData = async () => {
    const querySnapshot = await getDocs(collection(db, "employeelist"))
    const employees = querySnapshot.docs.map( e => ({...e.data(), id: e.id}))
    setEmployee(employees.sort((a, b) => a.lastname.localeCompare(b.lastname)))
    setEmployeeInfo(employees)
  }
  useEffect (() => {
    readData()
  }, [])

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

  // DELETE EMPLOYEE
  const deleteEmployee = (id, firstname, lastname) => {
    const param = doc(db, "employeelist", id)    
    Swal.fire({    
      title: `Are you sure you want to delete ${firstname} ${lastname}'s data?`,
      showConfirmButton: true,
      confirmButtonText: "Delete",
      showDenyButton: true,
      denyButtonText: `No`,
      confirmButtonColor: "#297EA6",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
      deleteDoc(param)

        Toast.fire({
          icon: "success",
          iconColor: "#297EA6",
          title: `${firstname} ${lastname}'s data has been deleted!`,
          color: "#297EA6",
        }) 

        readData()

      
      } else if (result.isDenied) {
        Toast.fire({
          width: '15rem',
          title: "No Changes Made.",
          color: "#297EA6",
        }) 
      }
    });
  }

  //EDIT EMPLOYEE INFO
  const updateEmployee = (toUpdate) => {
    setIsEmployee(toUpdate)
    setIsUpdating(true)
  }

  const sortName = (employee) => {
    setIsSortingName(!isSortingName)
    if (isSortingName) {
      employee.sort((a, b) => a.lastname.localeCompare(b.lastname)); // SORT ALPHABETICAL
    } else {
      employee.sort((a, b) => b.lastname.localeCompare(a.lastname)); // SORT ALPHABETICAL
    }
  }

  const sortJobTitle = (employee) => {
    setIsSortingJob(!isSortingJob)
    if (isSortingJob) {
      employee.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle)); // SORT ALPHABETICAL
    } else {
      employee.sort((a, b) => b.jobTitle.localeCompare(a.jobTitle)); // SORT ALPHABETICAL
    }
  }

  const sortDept = (employee) => {
    setIsSortingDepartment(!isSortingDepartment)
    if (isSortingDepartment) {
      employee.sort((a, b) => a.department.localeCompare(b.department)); // SORT ALPHABETICAL
    } else {
      employee.sort((a, b) => b.department.localeCompare(a.department)); // SORT ALPHABETICAL
    }
  }

  const sortStatus = (employee) => {
    setIsSortingStatus(!isSortingStatus)
    if (isSortingStatus) {
      employee.sort((a, b) => a.employmentStatus.localeCompare(b.employmentStatus)); // SORT ALPHABETICAL
    } else {
      employee.sort((a, b) => b.employmentStatus.localeCompare(a.employmentStatus)); // SORT ALPHABETICAL
    }
  }

  const navigate = useNavigate()

  const handleEmployeeDetails = (e) => {
    navigate(`/employeecard/:${e.id}`, { replace: true } )
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }



  return (
    <section value={employee} className="max-w-[1000px] mx-auto">
      {
        isLoggedIn  ? 
                      !isUpdating 
                        ?     
                        <>
                          <AddEmployee employee={employee} setEmployee={setEmployee} readData={readData}/>
                          <div className="px-5 text-white">
                            <table className="mt-5 bg-[#297EA6]/70 max-w-[1000px] mx-auto w-full
                                              table-fixed rounded-md overflow-hidden">
                              <thead>
                                <tr className="text-xs md:text-sm text-white/90 bg-[#00101C] rounded-t-md shadow-lg">
                                  {/* image placeholder */}
                                  <th className="p-5 text-center"></th>
                                  <th onClick={() => {sortName(employee)}} 
                                      className="px-3 py-3 cursor-pointer">
                                    <span className="flex justify-between items-center ">
                                      Name
                                    <div className={!isSortingName ? "duration-150" : "rotate-180 duration-150"}>↑</div>
                                    </span>
                                  </th>
                                  <th onClick={() => {sortJobTitle(employee)}} 
                                      className=" px-3 py-3 cursor-pointer">
                                    <span className="flex justify-between">
                                      Job Title
                                      <div className={!isSortingJob ? "duration-150" : "rotate-180 duration-150"}>↑</div>
                                    </span>
                                  </th>
                                  <th onClick={() => {sortDept(employee)}} 
                                      className="hidden lg:table-cell text-start px-3 py-1 cursor-pointer">
                                    <span  className="flex justify-between">
                                      Department
                                    <div className={!isSortingDepartment ? "duration-150" : "rotate-180 duration-150"}>↑</div>
                                    </span>
                                  </th>
                                  <th className="hidden md:table-cell text-start px-3 py-1">Email</th>
                                  <th className="hidden lg:table-cell text-start px-3 py-1">Phone</th>
                                  <th onClick={() => {sortStatus(employee)}} 
                                      className="text-start px-3 py-1 cursor-pointer">
                                    <span  className="flex justify-between">
                                      Status
                                    <div className={!isSortingStatus ? "duration-150" : "rotate-180 duration-150"}>↑</div>
                                    </span>
                                  </th>
                                  <th className="text-center">Update</th>
                                </tr>
                              </thead>
                              <tbody>
                                { //  MAP THROUGH THE EMPLOYEE ARRAY OF OBJECTS TO GET DATA
                                employee.length > 0 ?
                                employee
                                  .filter(emp => {
                                    return (
                                      search === "" ? emp 
                                                    : (
                                                      emp.firstname.toLowerCase().includes(search) ||
                                                      emp.lastname.toLowerCase().includes(search) ||
                                                      emp.id.toLowerCase().includes(search) ||
                                                      emp.email.toLowerCase().includes(search) ||
                                                      emp.employmentStatus.toLowerCase().includes(search) ||
                                                      emp.jobTitle.toLowerCase().includes(search) ||
                                                      emp.department.toLowerCase().includes(search)
                                                    )
                                                    
                                    )
                                  })
                                  .slice(numbersOfUsersSeen, numbersOfUsersSeen + usersPerPage)
                                  .map(e => {
                                    return (
                                      <tr key={e.id}
                                          className="text-xs md:text-sm text-[#f3f3f3]  cursor-pointer even:bg-[#00101C]/60 odd:bg-[#00101C]/70
                                                      hover:backdrop-blur-0 hover:bg-[#00101C]/40 duration-300">
                                        <td>
                                          <div className="flex justify-center"><img src={profileImage} alt='Profile Picture' className="rounded-full object-cover w-10 h-10"/></div>
                                        </td>
                                        <td onClick={() => {handleEmployeeDetails(e)}}
                                            className="text-start px-2 py-1 tracking-wide break-words
                                                      hover:scale-105 hover:font-bold hover:underline duration-150">
                                          {e.lastname}, {e.firstname}
                                        </td>
                                        <td className="text-start px-3 py-1 break-words">{e.jobTitle}</td>
                                        <td className="hidden lg:table-cell text-start px-3 py-1 break-words">{e.department}</td>
                                        <td className="hidden md:table-cell text-start px-3 py-1 break-all">{e.email}</td>
                                        <td className="hidden lg:table-cell text-start px-3 py-1 break-all">{e.phone}</td>
                                        <td className="table-cell text-start px-3">{e.employmentStatus}</td>
                                        <td className="flex justify-center items-center cursor-pointer h-[55px] px-3">
                                          <div  className="me-1 hover:scale-125 duration-150 bg-[#00101C]/70 rounded-full p-1" 
                                                title="Edit"
                                                onClick={() => {
                                                  updateEmployee(e)
                                                }}>
                                            ✏️
                                          </div>
                                          <div  className="hover:scale-125 duration-150 bg-[#00101C]/70 rounded-full p-1" 
                                                title="Delete"
                                                onClick={() => {
                                                  deleteEmployee(
                                                    e.id, 
                                                    e.firstname, 
                                                    e.lastname,
                                                    )
                                                }}>
                                            🗑️
                                          </div>
                                        </td>           
                                      </tr> 
                                    )
                                  })
                                  :
                                  <tr>
                                    <td className="px-2s py-3 italic text-xs md:text-sm">No records</td>
                                  </tr>
                                }
                                  
                              </tbody>
                            </table>
                            {
                              employee.length > 10 &&
                              <Pagination employee={employee} usersPerPage={usersPerPage} setCurrentPage={setCurrentPage} currentPage={{currentPage}}/> 
                            }
                          </div>
                        </> 
                        :
                        <EditEmployee employee={employee} 
                                      setEmployee={setEmployee} 
                                      readData={readData} 
                                      isEmployee={isEmployee} 
                                      setIsUpdating={setIsUpdating} 
                                      isUpdating={isUpdating}
                        />
                    : <div>
                        <h1 className="text-center mt-5 italic text-white">
                          You must be logged-in to access this page.
                        </h1>
                        <Login />
                      </div>
      }
      

    </section>
  )
}


export default EmployeeList