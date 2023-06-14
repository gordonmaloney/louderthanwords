import { useState, useEffect } from "react";
import React from "react";
import { Animicon } from "../Campaign/AnimIcon";

export const Loading = () => {


    const [dots, setDots] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            if (dots < 3) {setDots(old => old+1)} else {setDots(0)}
        }, 500)
    }, [dots])

  return (
    <div
      className="homeContainer"
      style={{
        flexBasis: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        placeContent: "center",
      }}
    >
      <center>
        <Animicon icon="loading" canvas forceLoop autoplay />
        <h2 style={{fontFamily: "Fjalla One", marginTop: 0, }}>Loading
        <span style={{opacity: dots > 0 ? 1 : 0 }}>.</span>
        <span style={{opacity: dots > 1 ? 1 : 0 }}>.</span>
        <span style={{opacity: dots > 2 ? 1 : 0 }}>.</span>
        </h2>
      </center>
    </div>
  );
};
