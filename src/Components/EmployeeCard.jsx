import { useParams } from "react-router-dom"

function EmployeeCard() {

  const params = useParams()

  return (
    <div>EmployeeCard {params.id}</div>
  )
}

export default EmployeeCard