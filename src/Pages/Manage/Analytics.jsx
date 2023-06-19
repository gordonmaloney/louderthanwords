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
    <div>
      {analyticsData ? (
        <div>
          <div style={{ fontFamily: "Fjalla One" }}>
            Total visits: {analyticsData?.visits?.length}
            <br />
            Total sends: {analyticsData?.sendClicks?.length}
            <br />
            <br />
            Over time:
            <br />
          </div>
          <center>
            <AnalyticsChart analyticsData={analyticsData} />
          </center>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
