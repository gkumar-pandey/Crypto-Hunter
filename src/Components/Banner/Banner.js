import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Crousel from "./Crousel";

const coustemStyle = {
  banner: {
    backgroundImage: "url(./banner2.jpg)",
    height: "400px",
    width: "100%",
    // border: "1px solid red",
  },
  bannerContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid red",
    padding: "0",
  },
  tagline: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid red",
  },
};
const Banner = () => {
  return (
    <div>
      <div style={coustemStyle.banner}>
        <Container style={coustemStyle.bannerContent}>
          <div style={coustemStyle.tagline}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
                fontSize: "3rem",
              }}
            >
              Crypto Hunter
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
              }}
            >
              Get all the info regarding your favorite Crypto currency
            </Typography>
          </div>
          <Crousel />
        </Container>
      </div>
    </div>
  );
};

export default Banner;
