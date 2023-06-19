import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ConfirmDeleteLanding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("../home");
    }, 3000);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontFamily: "Fjalla One" }}>
        <center>Campaign deleted - redirecting...</center>
      </h2>
    </div>
  );
};
