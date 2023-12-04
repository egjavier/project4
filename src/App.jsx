import { BrowserRouter, Routes, Route } from "react-router-dom"
import EmployeeList from "./Pages/EmployeeList"
import Layout from "./Components/Layout"
import NotFound from "./Pages/NotFound"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import EmployeeCard from "./Pages/EmployeeCard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />      
          <Route path="employeelist" element={<EmployeeList />} />
          <Route path="employeecard/:id" element={<EmployeeCard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
