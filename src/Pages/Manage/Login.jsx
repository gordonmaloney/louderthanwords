import React, { useState } from "react";
import { Box, Grid, TextField, InputAdornment } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BtnStyle, TextFieldStyle } from "../../MUIStyles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../API";

export const Login = ({setLoggedIn, setUuid, setOldPassword}) => {
  const Mobile = useMediaQuery("(max-width:600px)");

  const [logInData, setLogInData] = useState({ uuid: "", password: "" });
  const [showPassword, setShowPassword] = useState(true);



  const handleLogIn = async () => {
    //extract uuid from url
    const payload = {
      uuid: logInData.uuid.replace(window.location.host + "/", ""),
      password: logInData.password,
    };

    try {
      const response = await axios.post(API_URL + "campaigns/login", payload);
      console.log(response.status);
      response.status == '200' && setLoggedIn(true)
      response.status == '200' && setUuid(payload.uuid)
      response.status == "200" && setOldPassword(logInData.password)
    } catch (err) {
      console.log(err.response.status);
    }
  };

  console.log(window.location.host);
  return (
    <Box
      sx={{
        bgcolor: "rgb(221,28,26)",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        margin: "0 auto",
        paddingBottom: "0",
        width: "50%",
        minWidth: Mobile && "100vw",
        borderRadius: "15px",
        minHeight: "300px",
        marginBottom: "150px",
      }}
    >
      <div
        style={{
          padding: "2%",
          margin: "2%",
          transition: "0.5s ease",
          width: "92%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <h2
          style={{
            textTransform: "capitalize",
            fontFamily: "Fjalla One",
            margin: "0 0 20px 0",
          }}
        >
          Log in
        </h2>

        <Grid container spacing={2}>
          <Grid xs={12} item>
            <TextField
              sx={TextFieldStyle}
              fullWidth
              label="Campaign URL"
              value={logInData.uuid}
              onChange={(e) =>
                setLogInData({ ...logInData, uuid: e.target.value })
              }
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              style={TextFieldStyle}
              fullWidth
              id="password"
              label="Password"
              type={showPassword ? "password" : "text"}
              value={logInData.password}
              onChange={(e) =>
                setLogInData({ ...logInData, password: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start" onClick={() => {}}>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>{" "}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button style={BtnStyle} onClick={() => handleLogIn()}>
              Log in
            </Button>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};
