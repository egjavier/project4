import { BrowserRouter, Routes, Route } from "react-router-dom"
import EmployeeList from "./Components/EmployeeList"
import EditEmployee from "./Components/EditEmployee"
import Layout from "./Components/Layout"
import NotFound from "./Components/NotFound"
import Login from "./Components/Login"
import Register from "./Components/Register"
import AddEmployee from "./Components/AddEmployee"
import EmployeeCard from "./Components/EmployeeCard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeeList />} />
          <Route path="addemployee" element={<AddEmployee />} />
          <Route path="editemployee" element={<EditEmployee />} />
          <Route path="employeecard" element={<EmployeeCard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
