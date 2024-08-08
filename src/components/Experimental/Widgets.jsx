// import { KeyboardArrowUp, PersonOutlined } from "@mui/icons-material"
import widgetData from '../../data/Experimental/widgetData.json';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

// JSON DATA FETCH FOR WIDGET
const Widgets = ({ type }) => {
  const data = widgetData.find((widget) => widget.type === type);

  // ICON MAPPING
  const iconMap = {
    PersonOutlined: PersonOutlinedIcon,
    Business: BusinessIcon,
    WorkOutline: WorkOutlineIcon,
    EventAvailable: EventAvailableIcon,
  };

  if (!data) {
    console.error(`No widget data found for type: ${type}`);
    return <div>Error: No widget data found for type: {type}</div>;
  }

  const IconComponent = iconMap[data.icon];
  return (
    <div className="flex flex-1 justify-between shadow-[2px_4px_10px_1px_rgba(201,201,201,0.4)] p-2.5 rounded-[10px]">
      <div className="flex flex-col justify-between">
        <span className="font-[bold] text-sm text-[#a0a00a]">{data.title}</span>
        <span className="text-[28px] font-light">{data.counter}</span>
        <span className="w-max text-xs border-b-[gray] border-b border-solid">
          {data.link}
        </span>
      </div>
      <div className="flex flex-col justify-between">
        <div className={`flex items-center text-sm ${data.trend}`}>
          {data.trend === 'positive' ? (
            <KeyboardArrowUpIcon className="text-[green]" />
          ) : (
            <KeyboardArrowDownIcon className=" text-[red]" />
          )}
          {`${data.percentage}%`}
        </div>
        <IconComponent
          className="text-[25px] bg-[rgba(128,0,128,0.3)] self-end p-[5px] rounded-[5px]"
          style={{ color: data.color, backgroundColor: data.background }}
        />
      </div>
    </div>
  );
};

export default Widgets;
