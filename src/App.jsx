import { BrowserRouter, Routes, Route } from "react-router-dom"
import EmployeeList from "./Components/EmployeeList"
import AddEmployee from "./Components/AddEmployee"
import EditEmployee from "./Components/EditEmployee"
import Layout from "./Components/Layout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeeList />} />
          {/* <Route path="addemployee" element={<AddEmployee />} /> */}
          <Route path="editemployee" element={<EditEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
