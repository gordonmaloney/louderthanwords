import React from "react";
import { Modal, Button, Box } from "@mui/material";
import { BtnStyle } from "../../MUIStyles";

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%) scale(0.9)",
  width: "600px",
  height: "auto",
  maxWidth: "100vw",
  margin: "0 auto 0 auto",
  padding: "10px",
  backgroundColor: "rgba(255,255,255,0.7)",
  borderRadius: "15px",
  backdropFilter: "blur(5px)",
};

export const ReviewModal = ({ body, isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box style={ModalStyle}>
        <h1 style={{ fontFamily: "Fjalla One", margin: "0 0 12px 0" }}>
          Previewing...
        </h1>
        {body}
        <center>
          <Button
            sx={{ ...BtnStyle, transform: "scale(0.8)", marginTop: "5px" }}
            onClick={onClose}
          >
            Close preview
          </Button>
        </center>
      </Box>
    </Modal>
  );
};
