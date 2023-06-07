import { Button } from "@mui/material";
import React from "react";
import { BtnStyle } from "../MUIStyles";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const CampaignBox = ({ host, title, body, link }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="campaignBox">
      <span
        style={{
          width: "100%",
          textAlign: "left",
          fontFamily: "Fjalla One",
          fontSize: "1.5em",
        }}
      >
        {host}
      </span>
      <h2
        style={{
          fontFamily: "Fjalla One",
          textAlign: "center",
          textTransform: "uppercase",
          margin: "10px 0",
        }}
      >
        {title}
      </h2>

      <span className="threeLineEllipsis" style={{ textAlign: 'left', marginBottom: "10px" }}>
        {body}
      </span>

      <center>
        <Link to={`../${link}`}>
          <Button fullWidth sx={BtnStyle}>
            Take Action
          </Button>
        </Link>
      </center>
    </div>
  );
};
