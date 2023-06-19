import React, { useState } from "react";
import { Login } from "./Login";
import { Analytics } from "./Analytics";
import { CreateTabs } from "../Create/CreateTabs";
import axios from "axios";
import { API_URL } from "../../API";
import { Button, Grid } from "@mui/material";
import { BtnStyle } from "../../MUIStyles";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ManageLanding = () => {
  const Mobile = useMediaQuery("(max-width:900px)");

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const [uuid, setUuid] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [campaign, setCampaign] = useState("");

  const getCampaign = async () => {
    await axios.get(API_URL + "campaigns/" + uuid).then((response) => {
      setCampaign(response.data);
    });
  };

  uuid && !campaign && getCampaign();

  if (!loggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          placeContent: "center",
        }}
      >
        <center>
          <h2
            style={{
              paddingTop: "50px",
              fontFamily: "Fjalla One",
              margin: "0 0 20px 0",
            }}
          >
            Log in to manage your campaign or check its performance
          </h2>
          <Login
            setLoggedIn={setLoggedIn}
            setOldPassword={setOldPassword}
            setUuid={setUuid}
          />
        </center>
      </div>
    );
  }

  if (loggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Grid
          spacing={!Mobile && 1}
          container
          sx={{
            width: Mobile ? "100%" : "90%",
            margin: "0 auto",
            marginTop: "100px",
          }}
        >
          <Grid item xs={12} sx={{maxWidth: Mobile && "90%", margin: Mobile && "0 5%"}}>
            <h2
              style={{
                fontFamily: "Fjalla One",
                margin: "0 0 20px 0",
              }}
            >
              Manage your campaign
            </h2>
          </Grid>
          <Grid item xs={12} md={5}  sx={{maxWidth: Mobile && "90%", margin: Mobile && "0 5%"}}>
            <h3
              style={{
                fontFamily: "Fjalla One",
                margin: "0 0 20px 0",
              }}
            >
              Performance:
            </h3>
            <Analytics uuid={uuid} />

            <center>
              <Button
                style={{ ...BtnStyle, marginTop: "40px" }}
                onClick={() => setIsOpen(true)}
              >
                Delete campaign
              </Button>
            </center>
          </Grid>

          <Grid item xs={12} md={7} sx={{}}>
          <h3
              style={{
                fontFamily: "Fjalla One",
                margin: "0 0 20px 0",
                maxWidth: Mobile && "90%", margin: Mobile && "0 5%"
              }}
            >
              Edit your campaign:
            </h3>
            <CreateTabs editing={campaign} oldPassword={oldPassword} />
          </Grid>
        </Grid>

        <ConfirmDeleteModal
          isOpen={isOpen}
          onClose={onClose}
          oldPassword={oldPassword}
          uuid={uuid}
        />
      </div>
    );
  }
};
