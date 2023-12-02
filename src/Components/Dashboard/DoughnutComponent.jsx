import { useState } from "react"
import { useEffect } from "react"
import { Chart } from 'primereact/chart'


function DoughnutComponent() {

  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const data = {
      labels: ['Project 1', 'Project 2', 'Project 3'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
              ],
              hoverBackgroundColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
              ]
          }
      ]
  };
  const options = {
      cutout: '60%'
  };

  setChartData(data);
  setChartOptions(options);
  }, [])

  return (
    <>
      <h2 className="font-bold text-[#00101C] text-xl md:text-2xl mb-3">
        Doughnut Chart
      </h2>
      <hr/>
      <Chart  type="doughnut" 
              data={chartData} 
              options={chartOptions} 
              className="flex justify-center mt-4 h-60"
      />
    </>
  )
}

export default DoughnutComponent