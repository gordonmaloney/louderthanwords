import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export const AnalyticsChart = ({ analyticsData }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "",
      },
    },
  };

  //get all dates
  const AllEntries = [...analyticsData.visits, ...analyticsData.sendClicks].map(
    (item) => new Date(item.createdAt).toLocaleDateString()
  );

  //remove duplicates
  const labels = [...new Set(AllEntries)];

  const [visits, setVisits] = useState([]);
  const [clicks, setClicks] = useState([]);

  const getVisits = () => {
    let visitsData = [];

    labels.forEach((label) => {
      visitsData.push(
        analyticsData.visits.filter(
          (item) => new Date(item.createdAt).toLocaleDateString() == label
        ).length
      );
    });

    setVisits(visitsData);
  };

  const getClicks = () => {
    let clickData = [];

    labels.forEach((label) => {
      clickData.push(
        analyticsData.sendClicks.filter(
          (item) => new Date(item.createdAt).toLocaleDateString() == label
        ).length
      );
    });

    setClicks(clickData);
  };

  useEffect(() => {
    getVisits();
    getClicks();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Visits",
        data: visits,
        borderColor: "#51798D",
        backgroundColor: "#51798D",
      },
      {
        label: "Sends",
        data: clicks,
        borderColor: "#DD1C1A",
        backgroundColor: "#DD1C1A",
      },
    ],
  };

  return (
    <div
      style={{
        backgroundColor: "#DD1C1A",
        borderRadius: "15px",
        padding: "10px",
        width: "300px",
        height: "200px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          height: "190px",
          borderRadius: "12px",
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Line options={options} data={data} />{" "}
      </div>
    </div>
  );
};
