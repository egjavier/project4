import { useState, useContext} from "react";
import db from "./FirebaseConfig";
import { addDoc, collection} from "firebase/firestore";
import Swal from 'sweetalert2';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "./FirebaseConfig"
import Context from "../Context/Context";

function AddEmployee({employee, setEmployee, readData}) {

// const {setImgLink} = useContext(Context)

//Firebase Storage
// const [ imageUrl, setImageUrl ] = useState('')
// const [ url, setUrl ] = useState('')
// const handleUploadImage = () => {
//   const imgName = new Date().getTime() + imageUrl.name
//   const storageRef = ref(storage, imgName)
//   uploadBytes(storageRef, imageUrl).then(() => {
//     alert('file uploade')
    // getDownloadURL(storageRef).then(url => {
    //   setUrl(url)
    //   setImgLink(url)
    // }).catch(error => console.error(error.message, "error getting image url"))
//   }).catch(error => console.error(error.message))
// }
// NEW EMPLOYEE STATES
  const [ lastname, setLastname ] = useState("")
  const [ firstname, setFirstname ] = useState("")
  const [ jobTitle, setJobTitle ] = useState("")
  const [ department, setDepartment ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ phone, setPhone ] = useState(0)
  const [ employmentStatus, setEmploymentStatus ] = useState("")
  const [ hireDate, setHireDate ] = useState("")

  const [ isAdding, setIsAdding ] = useState(false)

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

// ADD NEW EMPLOYEE USING A FORM
const handleSubmit =  async () => {

  if (!firstname || !lastname || !email || !phone || !jobTitle || !department || !hireDate || !employmentStatus) {
    await Toast.fire({
      width: "15rem",
      title: "Missing Fields!",
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
   
      try{
        addDoc(collection(db, "employeelist"), {
          ...newEmployee
        });
      } catch (err) {
        console.error(err)
      }
    
      setEmployee(employee)
  
      setLastname("")
      setFirstname("")
      setEmail("")
      setPhone("")
      setJobTitle("")
      setDepartment("")
      setHireDate("")
      setEmploymentStatus("")

      // firebase Storage
      // handleUploadImage()

      Toast.fire({
        icon: "success",
        iconColor: "#297EA6",
        title: `${firstname} ${lastname}'s data has been added!`,
        color: "#297EA6",
      }) 
      setIsAdding(false)
      readData()
  }
}


// Add button
const handleAdd =() => {
  setIsAdding(!isAdding)
}

  return (
    <div className="add bg-white m-5 rounded">
        <button className="p-4 text-[#297EA6] font-bold md:text-lg flex justify-between items-center w-full"
                onClick={() => {
                  handleAdd()
                      }}>
        Add Employee
        <div className= { !isAdding ? "text-[#297EA6] duration-300"
                                   : "text-[#297EA6] rotate-180 duration-300"
                                
                        }>▼</div>
      </button>
      <div className= { !isAdding  ? "hidden"
                                  : "px-5 pb-5 flex flex-col gap-2 duration-300"
                      }>
        {/* upload image */}
        <hr />
        <div>
            <label htmlFor="profileImage" className="text-xs md:text-sm font-semibold text-[#297EA6]">Image: </label>
            <input  name="profileImage" id="profileImage" 
                    type="file" 
                    placeholder="Doe"
                    // onChange={e => setImageUrl(e.target.files[0])}
                    // defaultValue={imageUrl}
                    className="placeholder:italic placeholder:indent-2
                              border outline-neutral-700 rounded-sm
                              text-xs md:text-sm indent-2 text-[#297EA6] py-1"
            />                
        </div>
        {/* name */}
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
            <label htmlFor="lastname" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Last Name:</label>
            <input  name="lastname" id="lastname" 
                    type="text" 
                    placeholder="Doe"
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                    className="placeholder:italic placeholder:indent-2
                              border outline-neutral-700 rounded-sm w-full
                              text-xs md:text-sm indent-2  py-1"
            />                
          </div>
          <div className="col-span-6">
            <label htmlFor="firstname" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">First Name:</label>
            <input  name="firstname" id="firstname" 
                    type="text" 
                    placeholder="John"
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                    className="placeholder:italic placeholder:indent-2
                              border outline-neutral-700 rounded-sm w-full
                              text-xs md:text-sm indent-2 py-1"
            />                
          </div>
        </div>
        {/* job title and department */}
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
          <label htmlFor="jobTitle" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Job Title:</label>
          <input  name="jobTitle" id="jobTitle" 
                  type="text" 
                  placeholder="Full Stack Developer"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  className="placeholder:italic placeholder:indent-2 w-full
                            border outline-neutral-700 rounded-sm
                            text-xs md:text-sm indent-2 py-1"
          />                
          </div>
          <div className="col-span-6">
            <label htmlFor="department" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Department:</label>
            <input  name="department" id="department" 
                    type="text" 
                    placeholder="Web Development"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="placeholder:italic placeholder:indent-2 w-full
                              border outline-neutral-700 rounded-sm
                              text-xs md:text-sm indent-2 py-1"
            />                
          </div>
        </div>
        {/* Email and phone */}
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
          <label htmlFor="email" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Email:</label>
          <input  name="email" id="email" 
                  type="email" 
                  placeholder="johndoe@domain.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="placeholder:italic placeholder:indent-2
                            border outline-neutral-700 rounded-sm w-full
                            text-xs md:text-sm indent-2 py-1"
          />                
          </div>
          <div className="col-span-6">
            <label htmlFor="phone" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6] ">Phone:</label>
            <input  name="phone" id="phone" 
                    type="number" 
                    placeholder="0987654321"
                    value={phone}
                    onChange={e => setPhone(Number(e.target.value))}
                    className="placeholder:italic placeholder:indent-2
                              border outline-neutral-700 rounded-sm w-full
                              text-xs md:text-sm indent-2 py-1"
            />
          </div>
        </div>
        {/* Employment Status and hire date */}
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
          <label htmlFor="employmentStatus" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Status</label>
          <select name="employmentStatus" 
                  id="employmentStatus"
                  value={employmentStatus}
                  onChange={e => setEmploymentStatus(e.target.value)}
                  className="italic border outline-neutral-700 rounded-sm w-full
                  text-xs md:text-sm indent-1 text-neutral-400 py-1" >
            <option value="Select">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
          </div>
          <div className="col-span-6">
            <label htmlFor="hireDate" className="me-1 text-xs md:text-sm font-semibold text-[#297EA6]">Hire Date:</label>
            <input  name="hireDate" id="hireDate" 
                    type="date" 
                    placeholder="Nov 17 2020"
                    value={hireDate}
                    onChange={e => setHireDate(e.target.value)}
                    className="border outline-neutral-700 rounded-sm cursor-pointer w-full
                              text-xs md:text-sm indent-1 text-neutral-400 py-1"
            />                
          </div>
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
    </div>
  )
}


export default AddEmployee