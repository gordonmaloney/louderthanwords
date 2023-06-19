import React from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import {BreachEmail} from '../Emails'


export const Footer = () => {

  const Mobile = useMediaQuery('(max-width:600px)');

  let { pathname } = useLocation();
  if (pathname == "/") {
    return <></>;
  }


  return (
    <div className="footer">
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6} sx={{borderRight: !Mobile && '1px solid rgb(255, 241, 208)'}}>
          <Link to="/privacypolicy">Privacy Policy</Link>
          <br />
          <Link to="/termsofservice">Terms of Service</Link>
          <br />
          <Link to="/donationpolicy">Donation Policy</Link>
          <br />
          <Link to="/contact">Contact Us</Link>
          <br />© 2023 Louder Than Words. All rights reserved.
        </Grid>

        <Grid item xs={12} sm={6} sx={{padding: !Mobile && '0 5px'}}>
         
          Louder Than Words is a campaign tool designed to empower grassroots
          organizations. It is designed only for progressive, anti-oppression
          based campaigns and reject all forms of classism, racism, sexism,
          colonialism, homophobia, transphobia or other bigotries. But as a
          volunteer-based team, we cannot vet every campaign. If you believe a
          campaign breeches our terms of service, please get in touch here:
          {BreachEmail}
        </Grid>
      </Grid>
    </div>
  );
};
