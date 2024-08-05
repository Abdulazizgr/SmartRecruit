// import { KeyboardArrowUp, PersonOutlined } from "@mui/icons-material"
import './widget.scss';
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
        EventAvailable: EventAvailableIcon
      };

  if (!data) {
    console.error(`No widget data found for type: ${type}`);
    return <div>Error: No widget data found for type: {type}</div>;
  }

  const IconComponent = iconMap[data.icon];
  return (


    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.counter}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${data.trend}`}>
          {data.trend === 'positive' ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
          {`${data.percentage}%`}
        </div>
        <IconComponent 
          className="icon" 
          style={{ color: data.color, backgroundColor: data.background }}
        />
      </div>
    </div>
  );
};

export default Widgets;
