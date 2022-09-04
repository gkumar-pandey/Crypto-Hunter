import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { singleCoin } from "../Components/Config/Config";
import { LinearProgress, Typography, useMediaQuery } from "@mui/material";
import { CryptoState } from "../CryptoContext";
import { useTheme } from "@emotion/react";
import CoinInfo from "../Components/Coininfo/CoinInfo";
import { numberWithCommas } from "../Components/Banner/Crousel";

function CoinDetailPage() {
  const [coin, setCoin] = useState([]);
  const [coinId, setCoinId] = useState();
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = CryptoState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const coustemStyle = {
    container: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "center" : "none",
    },
    sidebar: {
      width: isMobile ? "100%" : "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "20px",
      borderRight: "2px solid grey",
    },
    chart: {},
    heading: {
      fontWeight: "bold",
      fontFamily: "Manserrat",
      margin: "10px",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: "25px",
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
    },
  };

  const { id } = useParams();

  const fetchSingleCoin = async () => {
    const { data } = await axios.get(singleCoin(id));
    setCoin(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleCoin();
  }, []);

  console.log(coin);

  return (
    <>
      <div style={coustemStyle.container}>
        {loading ? (
          <div style={{ width: "100%" }}>
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          </div>
        ) : (
          <>
            <div style={coustemStyle.sidebar}>
              <img src={coin.image.large} style={{ height: "200px" }} />
              <Typography variant="h3" sx={coustemStyle.heading}>
                {coin.name}
              </Typography>
              <Typography variant="subtitle" sx={coustemStyle.description}>
                {coin.description.en.split(". ")[0]}
              </Typography>
              <div style={coustemStyle.marketData}>
                <span style={{ display: "flex" }}>
                  <Typography variant="h5">Rank:</Typography>
                  &nbsp;
                  <Typography variant="h5">{coin.market_cap_rank}</Typography>
                </span>
                <span style={{ display: "flex" }}>
                  <Typography variant="h5">Current Price:</Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h5">
                    {symbol}{" "}
                    {numberWithCommas(
                      coin.market_data.current_price[currency.toLowerCase()]
                    )}
                  </Typography>
                </span>
                <span style={{ display: "flex" }}>
                  <Typography variant="h5">Market Cap:</Typography>
                  &nbsp; &nbsp;
                  <Typography variant="h5">
                    {symbol}{" "}
                    {numberWithCommas(
                      coin.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                    )}
                  </Typography>
                </span>
              </div>
            </div>
            <div style={coustemStyle.chart}>
              <CoinInfo />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CoinDetailPage;
