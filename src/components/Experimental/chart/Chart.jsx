import { useEffect, useState } from 'react';
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
import axios from 'axios';
import { MoreVert } from '@mui/icons-material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackedBarChart = ({ title }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/applicants');
        const applicants = response.data;

        // Initialize data structure for chart
        const dataByMonth = {
          Jan: { accepted: 0, rejected: 0, pending: 0 },
          Feb: { accepted: 0, rejected: 0, pending: 0 },
          Mar: { accepted: 0, rejected: 0, pending: 0 },
          Apr: { accepted: 0, rejected: 0, pending: 0 },
          May: { accepted: 0, rejected: 0, pending: 0 },
          Jun: { accepted: 0, rejected: 0, pending: 0 },
          Jul: { accepted: 0, rejected: 0, pending: 0 },
          Aug: { accepted: 0, rejected: 0, pending: 0 },
          Sep: { accepted: 0, rejected: 0, pending: 0 },
          Oct: { accepted: 0, rejected: 0, pending: 0 },
          Nov: { accepted: 0, rejected: 0, pending: 0 },
          Dec: { accepted: 0, rejected: 0, pending: 0 },
        };

        // Process data to count applicants per month by status
        applicants.forEach(applicant => {
          const month = new Date(applicant.dateApplied).toLocaleString('default', { month: 'short' });
          const status = applicant.status.toLowerCase();
          if (dataByMonth[month] && dataByMonth[month][status] !== undefined) {
            dataByMonth[month][status] += 1;
          }
        });

        // Prepare the data for the chart
        const processedData = {
          labels: Object.keys(dataByMonth),
          datasets: [
            {
              label: 'Accepted',
              backgroundColor: '#4caf50',
              stack: 'Stack 0',
              data: Object.values(dataByMonth).map(monthData => monthData.accepted),
            },
            {
              label: 'Rejected',
              backgroundColor: '#f44336',
              stack: 'Stack 0',
              data: Object.values(dataByMonth).map(monthData => monthData.rejected),
            },
            {
              label: 'Pending',
              backgroundColor: '#ff9800',
              stack: 'Stack 0',
              data: Object.values(dataByMonth).map(monthData => monthData.pending),
            },
          ],
        };

        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching applicants data:', error);
      }
    };

    fetchData();
  }, []);

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
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col justify-start items-start bg-[#f8f9fa] shadow-[0_4px_8px_rgba(0,0,0,0.1)] h-[400px] flex-[4] p-[30px] rounded-lg">
      <div className="flex justify-between items-center w-full text-[gray]">
        <h1 className="text-base font-medium text-left">Applicants Status Overview</h1>
        <MoreVert fontSize="small" />
      </div>
      {chartData ? <Bar data={chartData} options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default StackedBarChart;