import { Accordion, AccordionHeader, AccordionBody, AccordionList } from "@tremor/react";
import { useEffect, useState } from "react";
import db from "./FirebaseConfig";
import { addDoc, collection} from "firebase/firestore";
import Swal from 'sweetalert2';


function AddEmployee({employee, setEmployee, readData}) {

  
// NEW EMPLOYEE STATES
  const [ lastname, setLastname ] = useState("")
  const [ firstname, setFirstname ] = useState("")
  const [ jobTitle, setJobTitle ] = useState("")
  const [ department, setDepartment ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ phone, setPhone ] = useState(0)
  const [ employmentStatus, setEmploymentStatus ] = useState("")
  const [ hireDate, setHireDate ] = useState("")

  const [ isBtnDisabled, setisBtnDisabled ] = useState(false)
  const [ password, setPassword ] = useState('')

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

// ADD NEW EMPLOYEE USING A FORM
const handleSubmit =  async () => {

  if (!firstname || !lastname || !email || !phone || !jobTitle || !department || !hireDate || !employmentStatus) {
    await Toast.fire({
      title: "Missing Fields!",
      text: 'All fields are required.',
      icon: "warning",
      iconColor: "#00101C",
      color: "#297EA6",
    }) 
  } else {  
      const newEmployee = {
        lastname,
        firstname,
        jobTitle,
        department,
        email,
        phone,
        employmentStatus,
        hireDate
      }
      employee.push(newEmployee)
      console.log(employee)
    
      try{
        await addDoc(collection(db, "employeelist"), {
          ...newEmployee
        });
      } catch (err) {
        console.error(err)
      }
    
      setEmployee(employee)
      readData()
    
      setLastname("")
      setFirstname("")
      setEmail("")
      setPhone("")
      setJobTitle("")
      setDepartment("")
      setHireDate("")
      setEmploymentStatus("")
         
      Swal.fire({
        title: "Added!",
        icon: "success",
        focusConfirm: false,
        confirmButtonText: `
        <a href="/">Ok</a>
        `,
        allowOutsideClick: false
      });
  }
}

// DISABLE AND STYLE GENERATE PASSWORD BUTTON
  const disabledBtn = () => {
    setisBtnDisabled(true)
  }
  // generate random Password
    let char = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM'
    let pw=''
    for(let i = 0; i < 8; i++) {
      let index = Math.floor(Math.random() * char.length)
      pw += char.charAt(index)
    }
    useEffect(() => {
      setPassword(pw)
    }, [])

  return (
    <div className="accordion p-5 text-[#297EA6]">
      <AccordionList className="max-w-[1000px] mx-auto">
        <Accordion className="border-none">
          <AccordionHeader className="bg-white">
            <p className="text-[#297EA6] font-bold md:text-lg">
              Add Employee           
            </p>
          </AccordionHeader>
          <AccordionBody className="bg-white">
            <hr />
            <div  
                    className="p-5 flex flex-col gap-5 duration-300">
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
              {/* Generate password*/}
              <div className="flex justify-start items-center gap-5">
                <button type="submit"
                        className={
                          !isBtnDisabled  ? `border border-[#297EA6] rounded-md px-3 py-1
                                             hover:scale-105 duration-150
                                            text-[#297EA6] text-xs md:text-sm`
                                          : `border border-[#999999] rounded-md px-3 py-1
                                             bg-[#cccccc] text-[#666666] text-xs md:text-sm`
                        }
                        disabled = {isBtnDisabled }
                        onClick = {disabledBtn}>
                  Generate Password
                </button>
                {
                  !isBtnDisabled ? <p className="hidden"></p>
                                  : <p className="block italic text-sm md:text-base font-semibold">{password}</p>
                }
              </div>  
              {/* submit button*/}
              <div className="text-end">
                <button onClick={handleSubmit}
                        className="bg-[#00101C] rounded-md px-5 py-1
                                    hover:scale-105 duration-150
                                    text-white md:text-md ">
                  Submit
                </button>
                
              </div>                   
            </div>
          </AccordionBody>
        </Accordion>
      </AccordionList>
    </div>
  )
}


export default AddEmployee