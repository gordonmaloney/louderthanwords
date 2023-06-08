import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import Carousel1 from "./carousel1.png";
import Carousel2 from "./carousel2.png";
import Carousel3 from "./carousel3.png";

export const HomeCarousel = () => {
  {
    var items = [
      {
        name: "Mobilise your supporters",
        description:
          "Louder Than Words is a tool for running campaigns to demand action - create a template message for email or Twitter and mobilise supporters to send it en masse",
        imgSrc: Carousel1,
      },
      {
        name: "Demand action - make impact",
        description:
          "Use your campaigns to lobby politicians, bombard bad bosses or landlords, respond to consultations, or call out bigots",
        imgSrc: Carousel2,
      },
      {
        name: "Give that personal touch",
        description:
          "When creating a campaign, you can include prompt questions for supporters to further personalise their messages",
        imgSrc: Carousel3,
      },
    ];

    return (
      <center>
        <Carousel 
        navButtonsAlwaysVisible
        height={"95vh"} width={"100vw"} interval="8000">
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </center>
    );
  }
};

function Item(props) {
  return (
    <Paper
      sx={{
        height: "100%",
        width: "100vw",
        paddingTop: "50px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          marginLeft: '0px',
          zIndex: 1,
          background: `url(${props.item.imgSrc})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "absolute",
        }}
      ></div>

      <div
        className="homeCarouselDialogue"
        style={{
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px 30px 20px 30px",
          maxWidth: "300px",
        }}
      >
        <h1
          style={{
            width: "100%",
            margin: 0,
            fontFamily: "Fjalla One",
          }}
        >
          {props.item.name}
        </h1>
        <p
          style={{
            fontSize: "larger",
            textAlign: "left",
            width: "100%",
            fontFamily: "Fjalla One",
          }}
        >
          {props.item.description}
        </p>
      </div>
    </Paper>
  );
}
