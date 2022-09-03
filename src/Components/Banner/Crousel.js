import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../Config/Config";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
const coustemStyle = {
  carousel: {
    height: "50%",
    width: "100%",
    display: "flex",
    alignItem: "center",
  },

  price: {
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Montserrat",
  },
};

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Crousel = () => {
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  // console.log();

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link style={coustemStyle.crouselItem} to={`/coins/${coin.id}`}>
        <img src={coin.image} alt={coin.name} height="80px" />
        <div>
          <span>{coin.symbol}</span>
          &nbsp;
          <span>
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
          <div style={coustemStyle.price}>
            {symbol}
            {numberWithCommas(coin.current_price.toFixed(2))}
          </div>
        </div>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <>
      <div style={coustemStyle.carousel}>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          responsive={responsive}
          autoPlay
          disableButtonsControls
          items={items}
        />
      </div>
    </>
  );
};

export default Crousel;
export { numberWithCommas };
