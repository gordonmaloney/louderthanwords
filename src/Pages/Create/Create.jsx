import { useState } from "react";
import { CreateTabs } from "./CreateTabs";
import { Grid } from "@mui/material";
import Megaphone from "../../Images/megaphones.png";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Create = () => {
  const Mobile = useMediaQuery("(max-width:900px)");

  return (
    <div style={{ minHeight: "100vh"}}>
      <Grid
        container
        sx={{ width: Mobile ? "100%" : "90%", margin: "0 auto", marginTop: "100px" }}
      >
        <Grid item xs={12} md={5} sx={{maxWidth: "90%", margin: '0 auto'}}>
          <h1 style={{ fontFamily: "Fjalla One", margin: "0 0 20px 0" }}>
            Start a campaign
          </h1>
          <center>
            <img src={Megaphone} width="90%" height="auto" style={{marginBottom: "20px"}} />
          </center>

          <h2 style={{ fontFamily: "Fjalla One", margin: "0 0 20px 0" }}>
            Top Tips for running a great campaign:
          </h2>
          <ul>
            <li>
              Be concise and focused, clearly stating the purpose of the letter.
            </li>
            <li>
              Personalize the message by addressing the decision maker by name
              and sharing impactful anecdotes or statistics.
            </li>
            <li>
              Propose actionable solutions aligned with their responsibilities
              or objectives.
            </li>
            <li>
              Encourage engagement by requesting a response or offering further
              information.
            </li>
            <li>Proofread and edit for grammar, clarity, and coherence.</li>
            <li>
              Personalization and relevance are key to creating an impactful
              template letter.
            </li>
          </ul>
        </Grid>

        <Grid item xs={12} md={7} sx={{marginBottom: '80px'}} >
          <CreateTabs />
        </Grid>
      </Grid>
    </div>
  );
};
