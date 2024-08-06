// StackedBarChart.js
// src/StackedBarChart.js
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { MoreVert } from '@mui/icons-material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackedBarChart = ({ title }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'React-Django',
        backgroundColor: '#ff6384',
        stack: 'Stack 0',
        data: [0, 1, 2, 1, 2, 3, 1, 0, 0, 0, 0, 0],
      },
      {
        label: 'Laravel',
        backgroundColor: '#36a2eb',
        stack: 'Stack 0',
        data: [1, 0, 0, 1, 1, 2, 3, 0, 0, 0, 0, 0],
      },
      {
        label: 'Project Management',
        backgroundColor: '#ffce56',
        stack: 'Stack 0',
        data: [2, 2, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0],
      },
      {
        label: 'UI/UX Designer',
        backgroundColor: '#4bc0c0',
        stack: 'Stack 0',
        data: [0, 0, 1, 2, 3, 4, 2, 1, 0, 0, 0, 0],
      },
      {
        label: 'Cloud Team',
        backgroundColor: '#9966ff',
        stack: 'Stack 0',
        data: [1, 2, 3, 4, 3, 2, 1, 0, 0, 0, 0, 0],
      },
      {
        label: 'Marketing',
        backgroundColor: '#ff9f40',
        stack: 'Stack 0',
        data: [0, 1, 0, 2, 1, 0, 1, 2, 0, 0, 0, 0],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 24,
        },
        color: '#343a40',
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        max: 6, // Set max value for y-axis
      },
    },
  };

  return (
    <>
    <div className="flex flex-col justify-start items-start bg-[#f8f9fa] shadow-[0_4px_8px_rgba(0,0,0,0.1)] h-[400px] flex-[4] p-[30px] rounded-lg">
     <div className="flex justify-between items-center w-full text-[gray]">
        <h1 className=" text-base font-medium text-left">Department Awards Overview</h1>
        <MoreVert fontSize="small" />
      </div>
      <Bar data={data} options={options} />
    </div>
    </>
  );
};

export default StackedBarChart;










// import "./chart.scss"

// const Chart = () => {
//   return (
//     <div className="chart">Chart</div>
//   )
// }

// export default Chart