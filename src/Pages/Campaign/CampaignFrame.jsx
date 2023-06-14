import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Campaigns } from "../../Data/DummyCampaigns";
import { Grid, Button } from "@mui/material";
import Megaphone from "../../Images/megaphones.png";
import { Campaign } from "./Campaign";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BtnStyle } from "../../MUIStyles";
import { API_URL } from "../../API";
import axios from "axios";
import { Loading } from "./Loading";

export const CampaignFrame = () => {
  const Mobile = useMediaQuery("(max-width:900px)");

  //get campaignId from params
  const params = useParams();
  const { campaignId } = params;

  //find campaign from campaigns
  //const campaign = Campaigns.find((campaign) => campaign.uuid == campaignId);

  const [campaign, setCampaign] = useState("");

  const getCampaign = async () => {
    await axios.get(API_URL + campaignId).then((response) => {
      setCampaign(response.data);
    });
  };

  !campaign && getCampaign();

  if (!campaign) {
    return <Loading />;
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Grid
        spacing={!Mobile && 2}
        container
        sx={{
          width: Mobile ? "100%" : "90%",
          margin: "0 auto",
          marginTop: "100px",
        }}
      >
        <Grid item xs={12} md={5} sx={{}}>
          <div className="campaignPageBox">
            <h3
              style={{
                width: "100%",
                fontFamily: "Fjalla One",
                textAlign: "left !important",
                margin: "0 0 20px 0",
              }}
            >
              {campaign.host}

              {campaign.hostLink && (
                <Button
                  style={{
                    ...BtnStyle,
                    margin: "-15px -22px 0 0",
                    transform: "scale(0.7)",
                    float: "right",
                  }}
                  href={campaign.hostLink}
                  target="_blank"
                >
                  Visit host
                </Button>
              )}
            </h3>

            <center>
              <h1
                style={{
                  fontFamily: "Fjalla One",
                  margin: Mobile ? "0 0 10px 0" : "0 0 20px 0",
                }}
              >
                {campaign.title}
              </h1>
            </center>

            <p style={{ whiteSpace: "pre-line" }}>{campaign.blurb}</p>
          </div>
        </Grid>

        <Grid item xs={12} md={7} sx={{ marginBottom: "80px" }}>
          <Campaign campaign={campaign} />
        </Grid>
      </Grid>
    </div>
  );
};
