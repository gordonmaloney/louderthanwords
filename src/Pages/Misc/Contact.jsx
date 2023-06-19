import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Protest1 from "../../Images/protest1.png";
import { ContactEmail } from "../../Emails";
export const Contact = () => {
  const Mobile = useMediaQuery("(max-width:600px)");

  return (
    <div
      style={{
        width: Mobile ? "90%" : "60%",
        maxWidth: "600px",
        minHeight: "100vh",
        margin: "0 auto",
      }}
    >
      <div style={{ paddingTop: "80px" }}>
        <p>
          <h2 style={{ fontFamily: "Fjalla One", margin: 0 }}>Get in touch</h2>
          <br />
          <br />
          If you've got any questions, suggestions, or just want to bounce an
          idea around, we'd love to chat.
          <br />
          <br />
          Feel free to drop an email at {ContactEmail}
        </p>

        <center>
          <img src={Protest1} width={"110%"}
          style={{marginBottom: Mobile && "200px", marginLeft: "-5%"}}
          />
        </center>
      </div>
    </div>
  );
};
