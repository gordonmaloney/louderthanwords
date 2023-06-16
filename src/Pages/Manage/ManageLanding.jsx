import React, { useState } from "react";
import { Login } from "./Login";
import { Analytics } from "./Analytics";

export const ManageLanding = () => {

    const [uuid, setUuid] = useState('')
    const [loggedIn, setLoggedIn] = useState(true);


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
          <Login setLoggedIn={setLoggedIn} setUuid={setUuid} />
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
          >
          </h2>

          <Analytics uuid='naetransphobia'/>
        </center>
      </div>
    );
  }
};
