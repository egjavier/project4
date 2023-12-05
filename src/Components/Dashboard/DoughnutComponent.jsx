import { PieChart } from '@mui/x-charts/PieChart';

function DoughnutComponent() {

  return (
    <>
      <h2 className="font-bold text-[#00101C] text-xl md:text-2xl mb-3">
        Pie Chart
      </h2>
      <hr/>
      <div className='flex mt-3 py-3'>
        <PieChart  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: 'Project A' },
                        { id: 1, value: 15, label: 'Project B' },
                        { id: 2, value: 20, label: 'Project C' },
                        { id: 3, value: 55, label: 'Project C' },
                      ],
                      innerRadius: 12,
                      outerRadius: 100,
                      paddingAngle: 2,
                      cornerRadius: 4,
                      startAngle: 0,
                      endAngle: 360,
                      cx: 150,
                      cy: 96,
                    },
                  ]}
                  width={400}
                  height={200}
        />
      </div>
  </>
  )
}

export default DoughnutComponent