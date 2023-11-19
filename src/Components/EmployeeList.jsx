import AddEmployee from "./AddEmployee"
import Search from "./Search"
import profileImage from '../Images/profilePic.jpg'
import db from "./FirebaseConfig"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

function EmployeeList() {

  const [ employee, setEmployee ] = useState([])

// READ DATA FROM FIREBASE
const readData = async () => {
  const querySnapshot = await getDocs(collection(db, "employeelist"))
  const employees = querySnapshot.docs.map( e => ({...e.data(), id: e.id}))
  setEmployee(employees)
}
useEffect (() => {
  readData()
}, [])


   return (
    <section className="max-w-[1000px mx-auto">
      <AddEmployee employee={employee} setEmployee={setEmployee} readData={readData}/>
      <div className="px-5 text-white">
        <Search />
        <table className="mt-5 bg-[#297EA6]/70 max-w-[1000px] mx-auto w-full
                          table-auto rounded-md overflow-hidden">
          <thead>
            <tr className="text-xs md:text-sm text-white/90 bg-[#00101C] rounded-t-md shadow-lg">
              {/* image placeholder */}
              <th className="p-5 text-center"></th>
              <th className=" text-start px-3 py-1">Name</th>
              <th className=" text-start px-3 py-1">Job Title</th>
              <th className="hidden lg:table-cell text-start px-3 py-1">Department</th>
              <th className="hidden md:table-cell text-start px-3 py-1">Email</th>
              <th className="hidden lg:table-cell text-start px-3 py-1">Phone</th>
              <th className="table-cell text-center">Status</th>
              <th className="text-center">Update</th>
            </tr>
          </thead>
          <tbody >
            { //  MAP THROUGH THE EMPLOYEE ARRAY OF OBJECTS TO GET DATA
              employee.map(e => {
                return (
                  <tr key={e.id}
                      className="text-xs md:text-sm text-white
                                  hover:backdrop-blur-0 hover:bg-[#00101C]/50 duration-300">
                    <td className="py-2 w-14 pl-2">
                      <img src={profileImage} alt='Profile Picture' className="rounded-full w-10 h-10"/>
                    </td>
                    <td className="text-start px-2 py-1">{e.lastname}, {e.firstname}</td>
                    <td className="text-start px-3 py-1">{e.jobTitle}</td>
                    <td className="hidden lg:table-cell text-start px-3 py-1">{e.department}</td>
                    <td className="hidden md:table-cell text-start px-3 py-1">{e.email}</td>
                    <td className="hidden lg:table-cell text-start px-3 py-1">{e.phone}</td>
                    <td className="table-cell text-center">{e.employmentStatus}</td>
                    <td className="flex justify-center items-center cursor-pointer h-[55px]">
                      <div className="me-1 hover:scale-125 duration-150 bg-[#00101C]/70 rounded-full p-1" title="Edit">✏️</div>
                      <div className="hover:scale-125 duration-150 bg-[#00101C]/70 rounded-full p-1" title="Delete">🗑️</div>
                    </td>           
                  </tr> 
                )
              })
            }        
              
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default EmployeeList