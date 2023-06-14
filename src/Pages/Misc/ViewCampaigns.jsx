import React, { useState } from "react";
import { Grid, Button } from "@mui/material";
import { BtnStyle } from "../../MUIStyles";
//import { Campaigns } from "../../Data/DummyCampaigns";
import { CampaignBox } from "../../Components/CampaignBox";
import useMediaQuery from "@mui/material/useMediaQuery";
import CrowdsClouds from "../../Images/crowdsclouds.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../API";
import { Loading } from "../Campaign/Loading";

export const ViewCampaigns = () => {
  const Large = useMediaQuery("(max-width:1200px)");
  const Medium = useMediaQuery("(max-width:900px)");
  const Mobile = useMediaQuery("(max-width:650px)");

  const [Campaigns, setCampaigns] = useState([]);

  const getCampaigns = async () => {
    await axios.get(API_URL + "all").then((response) => {
      setCampaigns(response.data);
    });
  };

  if (Campaigns.length == 0) {
    getCampaigns();
    return (
          <Loading />
    );
  }

  return (
    <div
      className="homeContainer"
      style={{ marginTop: "100px", flexBasis: "100%" }}
    >
      <div>
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0px auto 180px auto",
            marginBottom: Medium ? "250px" : "180px",
            zIndex: 2,
          }}
        >
          <h2 style={{ fontFamily: "Fjalla One", textAlign: "center" }}>
            Browse existing campaigns:
          </h2>

          <Grid
            container
            spacing={4}
            style={{ flexDirection: Medium && "column-reverse" }}
          >
            <Grid item xs={12} md={5} lg={4}>
              <Grid container>
                <Grid item xs={12} sm={6} md={12}>
                  <center>
                    <img
                      src={CrowdsClouds}
                      style={{
                        width: Large ? "90%" : "120%",
                        maxWidth: Medium ? "300px" : "120%",
                        transform: Large ? "translate(0%)" : "translate(-10%)",
                      }}
                    />
                  </center>
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                  <center>
                    <div style={{ width: "100%" }}>
                      <div
                        className="campaignBox"
                        style={{
                          height: "150px",
                          width: "180px",
                          margin: "20px auto 0 auto",
                        }}
                      >
                        <div>
                          <h2
                            style={{
                              fontFamily: "Fjalla One",
                              margin: "0px 0 0 0",
                            }}
                          >
                            Inspired?
                          </h2>
                          <h3
                            style={{
                              fontFamily: "Fjalla One",
                              margin: "20px 0 10px 0",
                            }}
                          >
                            Start your own campaign now:
                          </h3>
                          <Link to="/create">
                            <Button size="large" sx={BtnStyle}>
                              Start a campaign
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </center>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={8} md={7} sm={12}>
              <Grid container spacing={2} justifyContent={"flex-start"}>
                {[...Campaigns].reverse().map((item) => (
                  <Grid
                    item
                    xs={12}
                    sm={Medium && 6}
                    lg={6}
                    xl={4}
                    justifyContent="center"
                    alignItems="center"
                    style={{ transform: Medium && "scale(0.9)" }}
                  >
                    <center>
                      <CampaignBox
                        host={item.host}
                        title={item.title}
                        body={item.blurb}
                        link={`/${item.uuid}`}
                      />
                    </center>
                  </Grid>
                ))}
              </Grid>{" "}
            </Grid>{" "}
          </Grid>
        </div>
      </div>
    </div>
  );
};
