import { PencilIcon, TrashIcon } from "@heroicons/react/solid"
import AddEmployee from "./AddEmployee"
import Search from "./Search"
import profileImage from '../Images/profilePic.jpg'

function EmployeeList() {
  return (
    <section className="max-w-[1000px mx-auto">
      <AddEmployee />
      <div className="px-5 text-white">
        <Search />
        <table className="mt-5 bg-[#297EA6]/70 max-w-[1000px] mx-auto w-full
                          table-auto rounded-md overflow-hidden">
          <thead className="">
            <tr className="text-xs md:text-sm text-white/90 bg-[#00101C] rounded-t-md shadow-lg">
              {/* placeholder for image */}
              <th className="p-5  text-center"></th>
              <th className=" text-start indent-2">Name</th>
              <th className=" text-center">ID</th>
              <th className=" text-start indent-2">Job Title</th>
              <th className="hidden lg:table-cell  text-start indent-2">Department</th>
              <th className="hidden md:table-cell  text-start indent-2">Email</th>
              <th className="hidden lg:table-cell  text-start indent-2">Phone</th>
              <th className="hidden lg:table-cell text-center">Status</th>
              <th className="text-center">Update</th>
            </tr>
          </thead>
          <tbody >
            <tr className="text-xs md:text-sm text-white
                            hover:backdrop-blur-0 hover:bg-[#00101C]/50">
              <td className="py-2 w-14 pl-2">
                <img src={profileImage} alt='Profile Picture' className="rounded-full w-10 h-10"/>
              </td>
              <td className="text-start indent-2">Doe, John</td>
              <td className="text-center">00001</td>
              <td className="text-start indent-2">Full Stack Developer</td>
              <td className="hidden lg:table-cell text-start indent-2">Web Development</td>
              <td className="hidden md:table-cell text-start indent-2">johndoe@domain.com</td>
              <td className="hidden lg:table-cell text-start indent-2">0987654321</td>
              <td className="hidden lg:table-cell text-center">Full-time</td>
              <td className="flex justify-center items-center cursor-pointer h-[55px]">
                <div className="me-1 hover:scale-125 duration-150 bg-[#00101C]/70 rounded-full p-1" title="Edit">✏️</div>
                <div className="hover:scale-125 duration-150 bg-[#00101C]/70 rounded-full p-1" title="Delete">🗑️</div>
              </td>           
            </tr>

            
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default EmployeeList