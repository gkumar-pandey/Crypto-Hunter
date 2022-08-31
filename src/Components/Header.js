import React from "react";
import { AppBar, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

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
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"IN"}>IN</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
