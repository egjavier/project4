import AddEmployee from "./AddEmployee"

function EmployeeList() {
  return (
    <section>
      <AddEmployee />
      <div>
        <span>search</span>
        <span>
          <p>filter</p>
          <p>sort</p>
        </span>
        <table>
          <thead>
            <tr>
              <th>header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default EmployeeList