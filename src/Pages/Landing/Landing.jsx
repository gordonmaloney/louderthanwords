import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { BtnStyle } from "../../MUIStyles";
import { Link } from "react-router-dom";


export const Landing = () => {

  return (
    <>
      <div className="landingBG">
        <div className="landingCont">
          <div className="landingHeader"></div>

          <div className="landingDialogue">
            Louder Than Words is a platform for grassroots groups to demand
            action
            <br />
            <br />
            <Link to="/home">
              <Button size="large" variant="contained" sx={BtnStyle}>
                GET STARTED
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};
