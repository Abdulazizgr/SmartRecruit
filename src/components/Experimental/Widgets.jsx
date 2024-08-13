import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import widgetData from '../../data/Experimental/widgetData.json';

const iconMap = {
  PersonOutlined: PersonOutlinedIcon,
  Business: BusinessIcon,
  WorkOutline: WorkOutlineIcon,
  EventAvailable: EventAvailableIcon,
};

const Widgets = ({ type }) => {
  const data = widgetData.find((widget) => widget.type === type);

  if (!data) {
    console.error(`No widget data found for type: ${type}`);
    return <div>Error: No widget data found for type: {type}</div>;
  }

  const IconComponent = iconMap[data.icon];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        borderRadius: '16px',
        backgroundColor: '#fff',
        boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.1)`,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0px 8px 20px rgba(0, 0, 0, 0.15)`,
        },
        // Responsive adjustments
        '@media (max-width: 600px)': {
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0.75rem',
        },
      }}
    >
      {/* Left Side Colored Line */}
      <Box
        sx={{
          position: 'absolute',
          width: '5px',
          height: '100%',
          backgroundColor: data.color,
          left: 0,
          top: 0,
          borderRadius: '16px 0 0 16px',
        }}
      />

      {/* Content Area */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          paddingLeft: '1rem',
          '@media (max-width: 600px)': {
            paddingLeft: '0.5rem',
            paddingBottom: '1rem',
          },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: data.color, fontWeight: 'bold' }}
        >
          {data.title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {data.counter}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', marginTop: '8px' }}
        >
          {data.link}
        </Typography>
      </Box>

      {/* Right Side Icon and Percentage */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          textAlign: 'right',
          '@media (max-width: 600px)': {
            alignItems: 'flex-start',
            textAlign: 'left',
            paddingTop: '1rem',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: data.trend === 'positive' ? 'success.main' : 'error.main',
          }}
        >
          {data.trend === 'positive' ? (
            <KeyboardArrowUpIcon fontSize="small" />
          ) : (
            <KeyboardArrowDownIcon fontSize="small" />
          )}
          <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
            {`${data.percentage}%`}
          </Typography>
        </Box>

        <IconButton
          sx={{
            backgroundColor: data.background,
            color: data.color,
            boxShadow: `inset 0 0 0 1px rgba(0, 0, 0, 0.2)`,
            borderRadius: '50%',
            padding: '8px',
            '&:hover': {
              backgroundColor: data.background,
              boxShadow: `0 4px 8px rgba(0, 0, 0, 0.15)`,
            },
            '@media (max-width: 600px)': {
              padding: '6px',
            },
          }}
        >
          <IconComponent fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Widgets;
