import { BarChart } from '@mui/x-charts/BarChart'

function BarChartComponent() {

  return (
    <>
      <h2 className="font-bold text-[#00101C] text-xl md:text-2xl mb-3">
        Bar Chart
      </h2>
      <hr/>
      <div className='flex justify-center'>
          <BarChart
          xAxis={[{ scaleType: 'band', data: ['Client A', 'Client B', 'Client C'] }]}
          series={[{ data: [1, 2, 3] }, { data: [5, 6, 8] }, { data: [2, 5, 6] }]}
          width={435}
          height={400}
          />
      </div>
    </>
  )
}

export default BarChartComponent