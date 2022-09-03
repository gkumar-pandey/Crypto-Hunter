import {
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import { CoinList } from "../Config/Config";
import { numberWithCommas } from "../Banner/Crousel";
import "./CoinsTable.css";

const coustemStyle = {
  row: {
    cursor: "pointer",
    backgroundColor: "#16171a",
    fontFamily: "Montserrat",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
  img: {
    height: "50px",
    marginBottom: "10px",
  },
  pagenation: {
    widht: "100%",
    padding: "10px",

    display: "flex",
    justifyContent: "center",
    color: "gold",
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
};

const CoinsTable = () => {
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoding] = useState(true);
  const [search, setSearch] = useState("");
  const { symbol, currency } = CryptoState();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchCoinList = async () => {
    setLoding(true);
    const { data } = await axios.get(CoinList(currency));
    setCoinList(data);
    setLoding(false);
  };

  useEffect(() => {
    fetchCoinList();
  }, [currency]);

  const handleSearch = () => {
    return coinList.filter((coin) => {
      return coin.name.toLowerCase().includes(search);
    });
  };

  // useEffect(() => {}, [search]);

  return (
    <div>
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Montserrat",
            textTransform: "capitalize",
            margin: "10px 0",
            fontWeight: "600",
          }}
        >
          CryptoCurrency Price on Market Cap
        </Typography>
        <TextField
          label="Search Crypto currency..."
          variant="outlined"
          sx={{ width: "100%", margin: "20px 0" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <LinearProgress sx={{ backgroundColor: "gold" }} />
        ) : (
          <>
            <Table>
              <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["coin", "Price", "24h Change", "Market Cap"].map((head) => {
                    return (
                      <TableCell
                        sx={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        align={head == "coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        sx={coustemStyle.row}
                        //   className="row"
                      >
                        <TableCell component="th" scope="row">
                          <img src={row.image} style={coustemStyle.img} />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: profit > 0 ? "green" : "red" }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </>
        )}
        <Pagination
          sx={coustemStyle.pagenation}
          count={(handleSearch().length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </div>
  );
};

export default CoinsTable;
