import React, { useState } from "react";
import { Login } from "./Login";
import { Analytics } from "./Analytics";
import { CreateTabs } from "../Create/CreateTabs";
import axios from "axios";
import { API_URL } from "../../API";
import { Button } from "@mui/material";
import { BtnStyle } from "../../MUIStyles";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

export const ManageLanding = () => {
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
          flexDirection: "column",
          placeContent: "center",
        }}
      >
        <center>
          <h2
            style={{
              fontFamily: "Fjalla One",
              margin: "0 0 20px 0",
            }}
          ></h2>
        </center>

        <div style={{ marginBottom: "200px" }}>
          <CreateTabs editing={campaign} oldPassword={oldPassword} />
          <Analytics uuid={uuid} />
          <Button style={BtnStyle} onClick={() => setIsOpen(true)}>
            Delete campaign
          </Button>
        </div>

        <ConfirmDeleteModal isOpen={isOpen} onClose={onClose} 
        oldPassword={oldPassword}
        uuid={uuid}
        />
      </div>
    );
  }
};
