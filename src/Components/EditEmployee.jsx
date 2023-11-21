import db from "./FirebaseConfig";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

function EditEmployee({employee, setEmployee, readData, isEmployee, setIsUpdating}) {

  // NEW EMPLOYEE STATES
  const [ lastname, setLastname ] = useState(isEmployee.lastname)
  const [ firstname, setFirstname ] = useState(isEmployee.firstname)
  const [ jobTitle, setJobTitle ] = useState(isEmployee.jobTitle)
  const [ department, setDepartment ] = useState(isEmployee.department)
  const [ email, setEmail ] = useState(isEmployee.email)
  const [ phone, setPhone ] = useState(isEmployee.phone)
  const [ employmentStatus, setEmploymentStatus ] = useState(isEmployee.employmentStatus)
  const [ hireDate, setHireDate ] = useState(isEmployee.hireDate)

   //MODAL
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  }) 

// UPDATE EMPLOYEE INFO
const handleUpdate = () => {


  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    confirmButtonText: "Yes, Update",
    confirmButtonColor: "#297EA6",
    denyButtonText: `No, Don't Update`,
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Updated!",
        icon: "success",
        focusConfirm: false,
        confirmButtonText: `
        <a href="/">Ok</a>
        `,
        allowOutsideClick: false
      });

      const emp = {
        lastname,
        firstname,
        jobTitle,
        department,
        email,
        phone,
        employmentStatus,
        hireDate
      }

      try{
        setDoc(doc(db, "employeelist", isEmployee.id), {...emp})
      } catch (err) {
        console.error(err)
      }

      readData()
      setEmployee(employee)
    } else if (result.isDenied) {
      Swal.fire({
        title: "No changes made!",
        icon: "warning",
        focusConfirm: false,
        confirmButtonText: `
        <a href="/">Ok</a>
        `,
        allowOutsideClick: false
      });
    }

    setIsUpdating(false)
  });

  readData()
}

console.log()

return (
  <div className="Edit bg-white m-5">
    <h1 className="p-4 text-[#297EA6] font-bold md:text-lg">
      Update Employee Record
    </h1>
    <hr />
    <div className="p-5 flex flex-col gap-5 duration-300">
    {/* upload image */}
    <div>
      <label htmlFor="profileImage" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Image: </label>
      <input  name="profileImage" id="profileImage" 
              type="file" 
              placeholder="Doe"
              className="placeholder:italic placeholder:indent-2 
                        border outline-neutral-700 rounded-sm
                        text-xs md:text-sm indent-2 text-[#297EA6] py-1"
      />                
    </div>
    {/* name */}
    <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-start items-start">
      <div>
        <label htmlFor="lastname" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Last Name:</label>
        <input  name="lastname" id="lastname" 
                type="text" 
                placeholder="Doe"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
                className="placeholder:italic placeholder:indent-2 
                          border outline-neutral-700 rounded-sm
                          text-xs md:text-sm indent-2  py-1"
        />                
      </div>
      <div>
        <label htmlFor="firstname" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">First Name:</label>
        <input  name="firstname" id="firstname" 
                type="text" 
                placeholder="John"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
                className="placeholder:italic placeholder:indent-2 
                          border outline-neutral-700 rounded-sm
                          text-xs md:text-sm indent-2 py-1"
        />                
      </div>
    </div>
    {/* job title and department */}
    <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-start items-start">
      <div>
        <label htmlFor="jobTitle" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Job Title:</label>
        <input  name="jobTitle" id="jobTitle" 
              type="text" 
              placeholder="Full Stack Developer"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              className="placeholder:italic placeholder:indent-2 
                        border outline-neutral-700 rounded-sm
                        text-xs md:text-sm indent-2 py-1"
        />                
        </div>
      <div>
        <label htmlFor="department" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Department:</label>
        <input  name="department" id="department" 
                type="text" 
                placeholder="Web Development"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="placeholder:italic placeholder:indent-2 
                          border outline-neutral-700 rounded-sm
                          text-xs md:text-sm indent-2 py-1"
        />                
      </div>
    </div>
    {/* Email and phone */}
    <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-start items-start">
      <div>
        <label htmlFor="email" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Email:</label>
        <input  name="email" id="email" 
              type="email" 
              placeholder="johndoe@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="placeholder:italic placeholder:indent-2 
                        border outline-neutral-700 rounded-sm
                        text-xs md:text-sm indent-2 py-1"
        />                
      </div>
      <div>
        <label htmlFor="phone" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6] ">Phone:</label>
        <input  name="phone" id="phone" 
                type="number" 
                placeholder="0987654321"
                value={phone}
                onChange={e => setPhone(Number(e.target.value))}
                className="placeholder:italic placeholder:indent-2 
                          border outline-neutral-700 rounded-sm
                          text-xs md:text-sm indent-2 py-1"
        />
      </div>
    </div>
    {/* Employment Status and hire date */}
    <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-start items-start">
      <div>
        <label htmlFor="employmentStatus" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Status</label>
        <select name="employmentStatus" 
              id="employmentStatus"
              value={employmentStatus}
              onChange={e => setEmploymentStatus(e.target.value)}
              className="italic border outline-neutral-700 rounded-sm
              text-xs md:text-sm indent-1 text-neutral-400 py-1" >
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Internship">Internship</option>
        </select>
      </div>
      <div>
        <label htmlFor="hireDate" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Hire Date:</label>
        <input  name="hireDate" id="hireDate" 
                type="date" 
                placeholder="Nov 17 2020"
                value={hireDate}
                onChange={e => setHireDate(e.target.value)}
                className="border outline-neutral-700 rounded-sm cursor-pointer
                          text-xs md:text-sm indent-1 text-neutral-400 py-1"
        />                
      </div>
    </div>  
    {/* submit button*/}
    <div className="flex flex-col justify-end items-end gap-2">
      <button onClick={handleUpdate}
            className="bg-[#00101C] rounded-md px-5 py-1
                        hover:scale-105 duration-150
                        text-white md:text-md ">
        Submit
      </button>
    </div>                   
    </div>
  </div>
)

 
}

export default EditEmployee