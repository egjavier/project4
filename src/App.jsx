import { BrowserRouter, Routes, Route } from "react-router-dom"
import EmployeeList from "./Components/EmployeeList"
import EditEmployee from "./Components/EditEmployee"
import Layout from "./Components/Layout"
import NotFound from "./Components/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeeList />} />
          <Route path="addemployee" element={<EditEmployee />} />
          <Route path="editemployee" element={<EditEmployee />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
