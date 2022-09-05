import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { HistoricalChart } from "../Config/Config";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { Chart as ChartJS } from "chart.js/auto";

const CoinInfo = ({ coin, isMobile }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const coustemStyle = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: isMobile ? "100%" : "70%",
      margin: "auto",
      marginTop: isMobile ? "0" : "25px",
      padding: isMobile ? "20px" : "40px",
      paddingTop: isMobile ? "0" : "40px",
    },
  };

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);

  const labels = historicalData.map((coin) => {
    let date = new Date(coin[0]);
    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    return days === 1 ? time : date.toLocaleDateString();
  });

  const data = {
    labels,
    datasets: [
      {
        data: historicalData.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency}`,
        borderColor: "#EEBC1D",
      },
    ],
  };

  return (
    <>
      <div style={coustemStyle.container}>
        {!historicalData ? (
          <CircularProgress size={250} thickness={1} sx={{ color: "gold" }} />
        ) : (
          <>
            <Line data={data} />
          </>
        )}
      </div>
    </>
  );
};

export default CoinInfo;
