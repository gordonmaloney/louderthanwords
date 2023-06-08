import React from "react";
import { Grid } from "@mui/material";
import WomanPhone from "../../Images/woman phone.png";
import Devices from "../../Images/devices2.png";
import { CampaignBox } from "../../Components/CampaignBox";
import { BtnStyle } from "../../MUIStyles";
import { Button } from "@mui/material";
import { Footer } from "../../Components/Footer";
import { Link } from "react-router-dom";
import { HomeCarousel } from "./HomeCarousel";
import Devices4 from "../../Images/devices4.png";
import { CampaignCarousel } from "./CampaignCarousel";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Home = () => {
  const Mobile = useMediaQuery("(max-width:900px)");

  return (
    <div>
      <div className="homeContainer">
        <section className="homeChild">
          <HomeCarousel />
        </section>
        <section className="homeChild">
          <Grid container sx={{ padding: "0 8%" }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                position: "relative",
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "100vw",
              }}
            >
              <div
                style={{
                  position: "absolute",

                  transform: !Mobile && "translate(-20%)",
                  marginTop: "60px",
                  zIndex: "0",

                  overflowX: "hidden !important",
                  maxWidth: "100vw",
                }}
              >
                <img
                  src={Devices4}
                  style={{
                    position: "relative",
                    width: "100%",
                    minWidth: "700px",
                    overflow: "hidden",
                  }}
                />
              </div>

              <div
                style={{
                  zIndex: 4,
                  width: "100%",
                  marginTop: Mobile ? "100px" : "50px",
                }}
              >
                <center>
                  <CampaignCarousel />
                </center>
              </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{}}>
              <center>
                <p
                  style={{
                    fontFamily: "Fjalla One",
                    fontSize: "1.2em",
                    textAlign: "left",
                    padding: "0 40px",
                    zIndex: 2,
                    marginTop: Mobile && "60px",
                  }}
                >
                  Welcome to Louder Than Words, the platform designed to empower
                  small grassroots organizations. We know that actions speak
                  louder than words, and we're here to help you make a lasting
                  impact.
                  <br />
                  <br />
                  With our user-friendly platform, you can easily run template
                  letter campaigns, engage your members, and create a voice that
                  cannot be ignored.
                </p>
                <img src={WomanPhone} width={Mobile ? "100%" : "75%"} height="auto" />
              </center>
            </Grid>
          </Grid>
        </section>
        <section className="homeChild">
          <Grid container sx={{ padding: "0 8%" }}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "Fjalla One",
                  fontSize: "1.2em",
                  textAlign: "left",
                  padding: "0 40px",
                }}
              >
                As small organisations we know that resources are often limited.
                That's why Louder Than Words is the perfect solution for your
                campaign needs.
                <br />
                <br />
                Our streamlined platform allows you to reach your elected
                representatives, corporate targets, bosses or landlords. With
                just a few clicks, you can mobilize your supporters and create a
                wave of change.
              </p>
              <Link to="/create">
                <Button size="large" sx={BtnStyle}>
                  Start a campaign
                </Button>
              </Link>
              <br />
              <Link to="/campaigns">
                <Button size="large" sx={BtnStyle}>
                  View campaigns
                </Button>
              </Link>
              <br />
              <Link to="/partner">
                <Button size="large" sx={BtnStyle}>
                  Partner with us
                </Button>
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                marginBottom: Mobile ? "230px" : "0",
                marginTop: Mobile ? "20px" : "0",
              }}
            >
              <center>
                <img src={Devices} width="70%" height="auto" />
              </center>
            </Grid>
          </Grid>
        </section>
      </div>
    </div>
  );
};
