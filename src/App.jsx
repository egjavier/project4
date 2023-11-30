import { BrowserRouter, Routes, Route } from "react-router-dom"
import EmployeeList from "./Components/EmployeeList"
import Layout from "./Components/Layout"
import NotFound from "./Components/NotFound"
import Login from "./Components/Login"
import Register from "./Components/Register"
import EmployeeCard from "./Components/EmployeeCard"
import ContextProvider from "./Context/ContextProvider"

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />      
            <Route path="employeelist" element={<EmployeeList />} />
            <Route path="employeecard/:id" element={<EmployeeCard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
