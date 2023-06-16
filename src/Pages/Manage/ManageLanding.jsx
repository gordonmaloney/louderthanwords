import React, { useState } from "react";
import { Login } from "./Login";
import { Analytics } from "./Analytics";
import { CreateTabs } from "../Create/CreateTabs";
import axios from "axios";
import { API_URL } from "../../API";

export const ManageLanding = () => {
  const [uuid, setUuid] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [oldPassword, setOldPassword] = useState('')
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
              fontFamily: "Fjalla One",
              margin: "0 0 20px 0",
            }}
          >
            Log in to manage your campaign or check its performance
          </h2>
          <Login 
          
          setLoggedIn={setLoggedIn} 
          setOldPassword={setOldPassword}
          setUuid={setUuid} />
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

        <CreateTabs editing={campaign} oldPassword={oldPassword} />
        <Analytics uuid={uuid} />
      </div>
    );
  }
};
