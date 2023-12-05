import { LineChart } from '@mui/x-charts/LineChart'

function LineChartComponent() {

  return (
    <>
    <h2 className="font-bold text-[#00101C] text-xl md:text-2xl mb-3">
      Bar Chart
    </h2>
    <hr/>
    <div className='flex justify-center'>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [49, 50, 50, 60, 58, 63],
            color: "#297EA6"
          },
        ]}
        width={400}
        height={300}
    />
    </div>
  </>
  )
}

export default LineChartComponent