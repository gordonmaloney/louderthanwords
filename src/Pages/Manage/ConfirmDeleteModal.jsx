import React, { useState, useEffect } from "react";
import { Modal, Button, Box, Tooltip, TextField } from "@mui/material";
import { BtnStyle } from "../../MUIStyles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../API";

const TextFieldStyle = {
  marginTop: "8px",
  "& label.Mui-focused": {
    color: "#537A8B",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#537A8B",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: "#537A8B",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#537A8B",
    },
    "& .MuiSelect-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#537A8B",
      },
    },
  },
};

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "auto",
  maxWidth: "90vw",
  margin: "0 auto 0 auto",
  padding: "15px",
  backgroundColor: "white",
  border: "5px solid #DD1C1A",
  borderRadius: "15px",
  backdropFilter: "blur(5px)",
};

const TooltipStyle = {
  tooltip: {
    sx: {
      color: "rgb(255, 241, 208)",
      bgcolor: "#5A788B",
      "& .MuiTooltip-arrow": {
        color: "#5A788B",
      },
    },
  },
};

export const ConfirmDeleteModal = ({ uuid, oldPassword, isOpen, onClose }) => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log("deleting....");

    const response = await axios.post(API_URL + "campaigns/delete/" + uuid, {password: oldPassword})

    navigate("../home")
    
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <Box style={ModalStyle}>
        <span
          style={{ float: "right", cursor: "pointer" }}
          onClick={() => {
            onClose();
          }}
        >
          <CloseIcon fontSize="large" />
        </span>

        <h1 style={{ fontFamily: "Fjalla One", margin: "0 0 12px 0" }}>
          Are you sure?
        </h1>

        <p>
          This <b>cannot be undone.</b> If you are sure you want to delete your
          campaign, type the word "delete" in this box:
        </p>

        <TextField
          style={TextFieldStyle}
          value={value}
          label="Confirm"
          onChange={(e) => setValue(e.target.value)}
        />
        <center>
          <Button
            disabled={value !== "delete"}
            style={{
              ...BtnStyle,
              color: value == "delete" ? "inherit" : "lightgrey",
              backgroundColor: value == "delete" ? "#DD1C1A" : "#fff1d0",
            }}
            onClick={handleDelete}
          >
            confirm
          </Button>
        </center>
        <br />

        <center>
          <Button
            sx={{ ...BtnStyle, transform: "scale(0.8)", marginTop: "5px" }}
            onClick={() => {
              onClose();
            }}
          >
            Close
          </Button>
        </center>
      </Box>
    </Modal>
  );
};
