import {
  LinearProgress,
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

const coustemStyle = {
  row: {},
  img: {
    height: "50px",
    marginBottom: "10px",
  },
};

const CoinsTable = () => {
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoding] = useState(true);
  const [search, setSearch] = useState("");
  const { currency } = CryptoState();
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

  return (
    <div>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontFamily: "Monsrrat" }}>
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
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      sx={coustemStyle.row}
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
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>
        )}
      </Container>
    </div>
  );
};

export default CoinsTable;
