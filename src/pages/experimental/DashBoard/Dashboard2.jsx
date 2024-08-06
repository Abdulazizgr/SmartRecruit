import React from 'react';
import Sidebar from '../../../components/Experimental/Sidebar';
import Navbar from '../../../components/Experimental/Navbar';
import Widgets from '../../../components/Experimental/Widgets';
import Featured from '../../../components/Experimental/featured/Featured';
import Chart from '../../../components/Experimental/chart/Chart';
import Table from '../../../components/Experimental/Table';

const Dashboard2 = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        homeContainer
        <div className="flex gap-5 p-5">
          <Widgets type="employee"/>
          <Widgets type="department"/>
          <Widgets type="open-postion"/>
          <Widgets type="attendance"/>
        </div>
        <div className="flex gap-5 p-5">
          <Featured/>
          <Chart/>
        </div>
          <div className="shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] m-5 p-5">
          <div className="font-medium text-[gray] mb-[15px]">Recent Applicants</div>
          <Table/>
          </div>
      </div>
    </div>
  );
};

export default Dashboard2;
