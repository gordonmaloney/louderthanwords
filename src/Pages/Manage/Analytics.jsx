import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../API";
import { AnalyticsChart } from "./AnalyticsChart";


export const Analytics = ({ uuid }) => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL + "analytics/" + uuid);
        console.log(response.data);
        setAnalyticsData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [uuid]);

 
  
  return (
    <div style={{width: '500px', height: '500px'}}>
      {analyticsData ? (
        <div>
          Analytics - {uuid}
          <br />
          <br />
          Total visits: {analyticsData?.visits?.length}
          <br />
          Total sends: {analyticsData?.sendClicks?.length}
          <br />
          <AnalyticsChart analyticsData={analyticsData}/>

        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
