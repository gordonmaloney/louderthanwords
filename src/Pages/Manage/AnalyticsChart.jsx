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
        display: true,
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

  const [visits, setVisits] = useState([])
  const [clicks, setClicks] = useState([])

  const getVisits = () => {
    let visitsData = []

    labels.forEach(label =>{
        visitsData.push(analyticsData.visits.filter(item => new Date(item.createdAt).toLocaleDateString() == label).length)
    })

    setVisits(visitsData)
  }

  const getClicks = () => {
    let clickData = []

    labels.forEach(label =>{
        clickData.push(analyticsData.sendClicks.filter(item => new Date(item.createdAt).toLocaleDateString() == label).length)
    })

    setClicks(clickData)
  }

  useEffect(() => {
    getVisits()
    getClicks()
  }, [])



  const data = {
    labels,
    datasets: [
      {
        label: "Visits",
        data: visits,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Sends",
        data: clicks,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />{" "}
    </div>
  );
};
