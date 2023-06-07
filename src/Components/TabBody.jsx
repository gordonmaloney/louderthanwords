import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const TabBody = ({ title, body }) => {
  const [fadeIn, setFadeIn] = useState(0);
  useEffect(() => {
    setFadeIn(1);
  }, []);

  return (
    <div
      style={{
        padding: "2%",
        margin: "2%",
        opacity: fadeIn,
        transition: "0.5s ease",
        width: "92%",
        minHeight: '370px',
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: "white",
        borderRadius: '10px'
      }}
    >
        <h2
        style={{textTransform: "capitalize", fontFamily: "Fjalla One", margin: '0 0 20px 0'}}
        >{title}</h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: "100%"
        }}>{body}</div>
    </div>
  );
};
