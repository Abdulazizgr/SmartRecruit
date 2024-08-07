import React, { useRef } from 'react';
import {
  ChatBubbleOutlineOutlined,
  DarkModeOutlined,
  FullscreenExitOutlined,
  LanguageOutlined,
  ListOutlined,
  NotificationsNoneOutlined,
  Search,
} from '@mui/icons-material';
import IElogo from '../../../public/assets/IElogo.png';

const Navbar = () => {
  const inputRef = useRef(null);

  const handleSearchIconClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className='flex items-center text-sm text-[#555] border-b-[0.5px] border-[rgba(231,229,228)] border-solid'>
      <div className='w-full flex items-center justify-between p-5'>
        <div className="flex items-center p-[3px] border-[0.5px] border-solid border-[lightgray] rounded-lg">
          <input
            ref={inputRef}
            className="h-[30px] border-none outline-none w-[0px] sm:w-11 bg-transparent relative z-10 transition-all duration-300 focus:border focus:border-gray-200 focus:w-80 focus:rounded-md focus:pl-3"
            type="text"
          />
          <Search onClick={handleSearchIconClick} className="cursor-pointer" />
        </div>
        <div className="flex items-center">
          <div className="flex items-center relative mr-5">
            <LanguageOutlined className='text-xl' />
            English
          </div>
          <div className="flex items-center relative mr-5">
            <DarkModeOutlined className='text-xl' />
          </div>
          <div className="flex items-center relative mr-5">
            <FullscreenExitOutlined className='text-xl' />
          </div>
          <div className="flex items-center relative mr-5">
            <NotificationsNoneOutlined className='text-xl' />
            <div className="w-[15px] h-[15px] bg-[red] text-[white] flex items-center justify-center text-[10px] absolute top-[-5px] right-[-5px] rounded-full">1</div>
          </div>
          <div className="flex items-center relative mr-5">
            <ChatBubbleOutlineOutlined className='text-xl' />
            <div className="w-[15px] h-[15px] bg-[red] text-[white] flex items-center justify-center text-[10px] absolute top-[-5px] right-[-5px] rounded-full">2</div>
          </div>
          <div className="flex items-center relative mr-5">
            <ListOutlined className='text-xl' />
          </div>
          <div className="flex items-center relative mr-5">
            <img
              src={IElogo}
              alt='profile-picture'
              className='w-[30px] h-[30px] bg-[rgba(0,0,0,0.103)] rounded-full'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
