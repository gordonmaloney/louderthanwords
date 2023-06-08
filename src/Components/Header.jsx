import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  let { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setDrawerOpen(false);
  }, [pathname]);

  if (pathname == "/") {
    return <></>;
  }

  return (
    <>
      <div className="header">
        <Link to="../" style={{ color: "inherit", textDecoration: "inherit" }}>
          Louder Than Words
        </Link>

        <MenuIcon
          onClick={() => setDrawerOpen(true)}
          sx={{ fontSize: "1em", color: "inherit" }}
        />
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="right"
      >
        <Box
          sx={{
            padding: "20px",
            height: "100vh",
            backgroundColor: "rgb(221,28,26)",
          }}
        >
          <h2
            style={{
              fontFamily: "Fjalla One",
              color: "rgb(255, 241, 208)",
              margin: "0",
            }}
          >
            Louder Than Words
          </h2>
          <hr style={{ border: "0.5px solid rgb(255, 241, 208)" }} />

          <p
            style={{
              fontFamily: "Fjalla One",
              textAlign: "right",
              fontSize: "1.4em",
              lineHeight: "2.2em",
            }}
          >
            <Link to="../home">HOME ·</Link>
            <br />
            <Link to="../create">START A CAMPAIGN ·</Link>
            <br />
            <Link to="/campaigns">VIEW CAMPAIGNS ·</Link>
            <br />
            <Link to="/partner">PARTNER WITH US ·</Link> <br />


            <Link to="/runcampaign">CAMPAIGN TOP TIPS ·</Link> <br />

            <Link to="/faq">FAQs ·</Link> <br />

            <Link to="/contact">GET IN TOUCH ·</Link> <br />


          </p>
        </Box>
      </Drawer>
    </>
  );
};
