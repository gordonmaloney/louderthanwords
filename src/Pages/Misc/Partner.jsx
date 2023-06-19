import React from "react";
import { Grid } from "@mui/material";
import Devices from "../../Images/devices3.png";
import RaisedFists from "../../Images/raised fistslong.png";
import Megaphone from "../../Images/megaphone frame.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PartnerEmail } from "../../Emails";
export const Partner = () => {
  const Mobile = useMediaQuery("(max-width:900px)");
  const Width500  = useMediaQuery("(max-width:500px)");

  return (
    <div className="homeContainer">
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div className="homeChild">
          <Grid
            container
            spacing={4}
            sx={{ paddingTop: "60px" }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sm={6}
              justifyContent="center"
              alignItems="center"
            >
              <center>
                <img
                  src={Megaphone}
                  style={{ maxHeight: "70vh", maxWidth: "90%", marginTop: Mobile && '50px' }}
                />
              </center>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "space-between",
                alignContent: "space-between",
              }}
            >
              <div>
                <h2 style={{ fontFamily: "Fjalla One", margin: 0 }}>
                  Partner with us
                </h2>

                <p>
                  We offer an exciting opportunity for organizations and groups
                  to partner with us and create their own customized version of
                  our campaign tool. With our partnership program, you can
                  leverage the power of Louder Than Words while showcasing your
                  brand and expanding the functionality to meet your specific
                  needs. Join us in making a real political impact and
                  amplifying the voices of grassroots campaigns.
                </p>
              </div>

              <div>
                <h2 style={{ fontFamily: "Fjalla One", margin: 0 }}>
                  Why work with us?
                </h2>

                <ul>
                  <li>
                    Customized Branding: Stand out with your own branding and
                    aesthetics, ensuring a cohesive user experience aligned with
                    your organization's identity.
                  </li>
                  <li>
                    Enhanced Functionality: Tailor the app's functionality to
                    suit your unique campaign requirements, adding or modifying
                    features to maximize effectiveness.
                  </li>
                  <li>
                    Cost-Effective Solution: Our partnership program offers
                    flexible pricing options that can be discussed based on your
                    organization's needs and budget.
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="homeChild" style={{ paddingBottom: "40px" }}>
          <Grid
            spacing={4}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <img
                src={RaisedFists}
                width="140%"
                style={{ marginLeft: "-40%" }}
              />

              <p>
                Partnering with Louder Than Words gives you the opportunity to
                take advantage of our established campaign tool while
                maintaining control over your messaging and outreach. Whether
                you're a nonprofit, advocacy group, or grassroots organization,
                this collaboration can help you streamline your campaigns and
                achieve your political goals.
                <br />
                <br />
                We believe in the power of collaboration and would love to
                discuss how we can work together. If you're interested in
                becoming a partner and creating a customized version of Louder
                Than Words, please reach out to us at
                {PartnerEmail}. Our team will be delighted to
                connect with you and explore the possibilities.
              </p>
            </Grid>

            <Grid item xs={12} md={6}>
              <p>
                Please note that pricing details for our partnership program
                will be discussed on an individual basis. We look forward to
                hearing from you and tailoring a solution that meets your
                specific requirements.
              </p>
              <center>
                <img src={Devices} width="80%" />
              </center>
              <p style={{marginBottom: Width500 ? "250px" : Mobile ? "150px" : ''}}>

              </p>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
