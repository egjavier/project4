import { useState, useEffect, useRef} from "react";
import db, { storage } from "../Components/FirebaseConfig";
import { addDoc, collection} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import  Avatar from "@mui/material/Avatar"
import spinner from "../Images/spinner.svg"
import upload from "../Images/upload.svg"

function AddEmployee({employee, setEmployee, readData}) {

  AOS.init()

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
  const [ imgLink, setImgLink ] = useState("")
  const [ file, setFile ] = useState('')
  const [ isRunning, setIsRunning ] = useState(false)

  const inputRef = useRef(null)

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

// FIREBASE STORAGE
  const getImage = () => {
    const fileName = new Date().getTime().toString() + file.name
    const storageRef = ref(storage, `images/${fileName}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
  
      uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            setIsRunning(true)
            break;
        }
      }, 
      (error) => {
        console.error(error)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgLink(downloadURL)
          setIsRunning(false)
        });
      }
    );
  }

  useEffect( () => {
    getImage()
  },[file])

// ADD NEW EMPLOYEE USING A FORM
const handleSubmit =  async () => {

  if (!firstname || !lastname || !email || !phone ||
     !jobTitle || !department || !hireDate || 
     !employmentStatus || !file ) {
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
        hireDate,
        imgLink,
      }
      employee.push(newEmployee)
   
      try{
        addDoc(collection(db, "employeelist"), {
          ...newEmployee
        });
        setEmployee(employee)
      } catch (err) {
        console.error(err)
      }
    
      setLastname("")
      setFirstname("")
      setEmail("")
      setPhone("")
      setJobTitle("")
      setDepartment("")
      setHireDate("")
      setEmploymentStatus("")
      setFile("")

      inputRef.current.value = null

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
                                  : "px-5 pb-5 flex flex-col gap-2"
                      }>
        {/* upload image */}
        <hr />
        <div className="flex flex-col justify-center items-center gap-3 mb-5">
          <div className="h-20 w-20 md:h-28 md:w-28 flex justify-center items-center">
            {
              file === "" ? <Avatar className="avatar" />
                             : <img src={!isRunning ? imgLink : upload}
                                    name="img"
                                    required
                                    alt="Profile Picture"
                                    className={
                                      !isRunning  ? "rounded-full h-20 w-20 md:h-28 md:w-28 object-cover"
                                                  : "rounded-full  h-20 w-20 md:h-28 md:w-28 object-cover animate-pulse"
                                    }
                                    
                              />
            }
          </div>
          <div className="">
            <input  name="profileImage" id="profileImage" 
                    type="file" 
                    defaultValue={file}
                    ref={inputRef}
                    onChange={e => {setFile(e.target.files[0])}}
                    className="placeholder:italic placeholder:indent-2 
                              border outline-neutral-700 rounded-sm
                              text-xs md:text-sm indent-2 text-[#297EA6] py-1"
            /> 
          </div>
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
                  autoComplete="true"
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
                    autoComplete="true"
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
          <div className="text-black">{isRunning}</div>
        </div>  
        {/* submit button*/}
        <div className="flex justify-end mt-3">
            {
              !isRunning  ? 
                            <button onClick={handleSubmit}
                                    className="bg-[#00101C] rounded-md px-5 py-1
                                                hover:scale-105 duration-150 font-semibold
                                                text-white text-xs md:text-sm ">
                              Submit
                            </button>
                          :
                            <button
                                    className="bg-gray-300 rounded-md px-1 py-1 flex gap-1 items-center font-semibold
                                              text-[#297EA6] text-xs md:text-sm italic cursor-not-allowed">
                            <img src={spinner} className=" animate-spin w-5" alt="Pending upload"/>
                                Uploading...
                            </button>
            }
        </div>                   
      </div>
    </div>
  )
}


export default AddEmployee