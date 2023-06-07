import React from "react";
import { CampaignBox } from "../../Components/CampaignBox";
import { Campaigns } from "../../Data/DummyCampaigns";

import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

export const CampaignCarousel = () => {
  {
    return (
      <Carousel interval="4000"> 
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
        link={`/${item.id}`}
      />
  );
}
