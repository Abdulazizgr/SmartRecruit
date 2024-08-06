import { MoreVert } from '@mui/icons-material';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import chartData from '../../../data/Experimental/chartData.json';

const Featured = () => {
  const { newHires } = chartData;
  return (
    <div className="flex-[2] shadow-[2px_4px_10px_1px_rgba(201,201,201,0.4)] p-2.5">
      <div className="flex items-center justify-between text-[gray]">
        <h1 className="text-base font-medium">{newHires.heading}</h1>
        <MoreVert fontSize="small" />
      </div>
      <div className="flex flex-col items-center justify-center gap-[15px] p-5">
        <div className="w-[100px] h-[100px]">
          <CircularProgressbar
            value={newHires.percentage}
            text={`${newHires.percentage}%`}
            strokeWidth={5}
            styles={buildStyles({
              textSize: '16px',
              pathColor: `rgba(62, 152, 199, ${newHires.percentage / 100})`,
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}
          />
        </div>
        
          <p className="font-medium text-[gray]">{newHires.title}</p>
          <p className="text-3xl">{newHires.value}</p>
          <p className="font-light text-xs text-[gray] text-center">{newHires.description}</p>
      </div>
    </div>
  );
};

export default Featured;
