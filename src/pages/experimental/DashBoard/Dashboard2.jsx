import React from 'react';
import Sidebar from '../../../components/Experimental/Sidebar';
import Navbar from '../../../components/Experimental/Navbar';
import './dashboard2.scss';
import Widgets from '../../../components/Experimental/Widgets';
import Featured from '../../../components/Experimental/featured/Featured';
import Chart from '../../../components/Experimental/chart/Chart';

const Dashboard2 = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        homeContainer
        <div className="widgets">
          <Widgets type="employee"/>
          <Widgets type="department"/>
          <Widgets type="open-postion"/>
          <Widgets type="attendance"/>
        </div>
        <div className="charts">
          <Featured/>
          <Chart/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;
