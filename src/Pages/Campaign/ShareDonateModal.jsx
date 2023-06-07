import React from "react";
import { Modal, Button, Box } from "@mui/material";
import { BtnStyle } from "../../MUIStyles";

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
  backgroundColor: "rgba(255, 241, 208, 0.8)",
  borderRadius: "15px",
  backdropFilter: "blur(5px)",
};

export const ShareDonateModal = ({ body, isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box style={ModalStyle}>
        <h1 style={{ fontFamily: "Fjalla One", margin: "0 0 12px 0" }}>
          One last thing...
        </h1>
        {body}
        <center>
          <Button
            sx={{ ...BtnStyle, transform: "scale(0.8)", marginTop: "5px" }}
            onClick={onClose}
          >
            Close
          </Button>
        </center>
      </Box>
    </Modal>
  );
};
