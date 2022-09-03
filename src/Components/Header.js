import React from "react";
import { AppBar, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

function Header() {
  const navigate = useNavigate();
  const coustemStyle = {
    title: {
      fontWeight: "bold",
      flex: "1",
      color: "gold",
      fontFamily: "Montserrat",
      cursor: "pointer",
    },
  };
  const { currency, setCurrency } = CryptoState();
  // console.log(currency);
  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography onClick={() => navigate("/")} sx={coustemStyle.title}>
            Crypto Hunter
          </Typography>
          <Select
            sx={{
              height: "40px",
              width: "100px",
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
