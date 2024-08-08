import React from 'react';
import Featured from '../../../components/Experimental/featured/Featured';  // Adjust the path as needed
import Chart from '../../../components/Experimental/chart/Chart';  // Adjust the path as needed

const Report = () => {
    return ( 
        <div className="flex gap-5 p-5">
              <Featured />
              <Chart />
        </div>
     );
}
 
export default Report;
