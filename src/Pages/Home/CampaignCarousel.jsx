import React from "react";
import { CampaignBox } from "../../Components/CampaignBox";
import { Campaigns } from "../../Data/DummyCampaigns";

import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

export const CampaignCarousel = () => {
  {
    return (
      <Carousel
        interval="4000"
        navButtonsAlwaysVisible
        navButtonsWrapperProps={{
          // Move the buttons to the bottom. Unsetting top here to override default style.
          style: {
            bottom: "-140px",
            top: "unset",
          },
        }}
      >
        {Campaigns.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    );
  }
};

function Item({ item }) {
  return (
    <CampaignBox
      host={item.host}
      title={item.title}
      body={item.blurb}
      link={`/${item.uuid}`}
    />
  );
}
