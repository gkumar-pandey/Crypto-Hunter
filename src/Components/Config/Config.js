const url = `https://pro-api.coingecko.com/api/v3/`;

export const singleCoin = (id) => {
  return `${url}coins/${id}`;
};

export const CoinList = (currency) => {
  return `${url}coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
};
export const HistoricalChart = (id, days = 365, currency) => {
  `${url}coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
};

export const TrendingCoins = (currency) => {
  return `${url}coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
};
