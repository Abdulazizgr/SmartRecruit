import React from 'react'
import "./navbar.scss"
import { ChatBubbleOutlineOutlined, DarkModeOutlined, FullscreenExitOutlined, LanguageOutlined, ListOutlined, NotificationsNoneOutlined, Search } from '@mui/icons-material'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className="search">
          <input type="text" placeholder='Search...' />
          <Search/>
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlined className='icon'/>
            English
          </div>
          <div className="item">
            <DarkModeOutlined className='icon'/> 
          </div>
          <div className="item">
            <FullscreenExitOutlined className='icon'/> 
          </div>
          <div className="item">
            <NotificationsNoneOutlined className='icon'/> 
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined className='icon'/> 
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlined className='icon'/> 
           
          </div>
          <div className="item">
            <img 
            src="../../../public/assets/IElogo.png"
            alt='profile-picture'
            className='avatar'
            />
          </div>
        </div>
          
          

      </div>
    </div>
  )
}

export default Navbar